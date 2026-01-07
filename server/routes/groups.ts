// server/routes/groups.ts
import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import * as Groups from '../db/groups.ts'

import type { CreateGroup, Group } from '../../models/groups'

const router = Router()

/**
 * Flexible auth:
 * - If 'x-user-id' header is present, accept and treat as logged-in (dev).
 * - Otherwise, run Auth0 checkJwt.
 */
function authFlexible(req: JwtRequest, res, next) {
  const headerId = req.header('x-user-id')
  if (headerId) {
    ;(req as any).userId = Number(headerId)
    return next()
  }
  // No header: try Auth0
  return checkJwt(req, res, (err?: any) => {
    if (err) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    const sub = req.auth?.sub
    if (sub) (req as any).userId = sub // map later to numeric users.id if needed
    return next()
  })
}

function getUserId(req: JwtRequest): number | undefined {
  const fromFlexible = (req as any).userId
  if (typeof fromFlexible === 'number') return fromFlexible
  const headerId = req.header('x-user-id')
  if (headerId) return Number(headerId)
  return undefined
}

// ---------------- ROUTES ----------------

// List groups (public)
router.get('/', async (_req, res, next) => {
  try {
    const groups = await Groups.listGroups()
    res.json({ groups })
  } catch (err) {
    next(err)
  }
})

// Get one group by id (public)
router.get('/:id', async (req, res, next) => {
  try {
    const group = await Groups.getGroupById(Number(req.params.id))
    if (!group)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Group not found' })
    res.json(group)
  } catch (err) {
    next(err)
  }
})

// Create group (auth)
router.post('/', authFlexible, async (req: JwtRequest, res, next) => {
  try {
    const userId = getUserId(req)
    if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const body: CreateGroup = req.body // name, description?, is_private?
    if (!body.name?.trim()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'name required' })
    }

    const group: Group | undefined = await Groups.createGroup({
      ...body,
      ownerId: userId,
    })

    res.status(StatusCodes.CREATED).json(group)
  } catch (err) {
    next(err)
  }
})

// Join group (auth)
router.post('/:id/join', authFlexible, async (req: JwtRequest, res, next) => {
  try {
    const userId = getUserId(req)
    if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const groupId = Number(req.params.id)
    const membership = await Groups.joinGroup(userId, groupId)
    res.status(StatusCodes.CREATED).json(membership)
  } catch (err) {
    next(err)
  }
})

// Leave group (auth)
router.post('/:id/leave', authFlexible, async (req: JwtRequest, res, next) => {
  try {
    const userId = getUserId(req)
    if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const groupId = Number(req.params.id)
    const result = await Groups.leaveGroup(userId, groupId)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// Delete group (owner only)
router.delete('/:id', authFlexible, async (req: JwtRequest, res, next) => {
  try {
    const userId = getUserId(req)
    if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    const groupId = Number(req.params.id)
    const result = await Groups.deleteGroup(groupId, userId)
    res.status(StatusCodes.OK).json(result)
  } catch (err: any) {
    const status = err.status ?? 500
    res
      .status(status)
      .json({ message: err.message ?? 'Failed to delete group' })
  }
})

export default router
