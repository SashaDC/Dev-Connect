import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/users.ts'

const router = Router()

// GET all users = Done
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET specific user = Done
router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.getUserById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST(add) user =

// PUT(update) users =
router.put('/', checkJwt, async (req: JwtRequest, res) => {
  const { user } = req.body
  const id = Number(req.params.id)

  if (!user || !id) {
    console.error('Bad Request - no user or id')
    return res.status(400).send('Bad request')
  }

  if (!req.auth?.sub) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  try {
    await db.userCanEdit(id, req.auth?.sub)
    const updatedUser = await db.updateUser(id, user)
    res.status(200).json({ user: updatedUser })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
      if (err instanceof Error && err.message === 'Unauthorized') {
        return res
          .status(403)
          .send('Unauthorized: Only the user who made the user may update it')
      }
      res.status(500).send('Something went wrong')
    }
  }
})

// DELETE user =
router.delete('/:id', checkJwt, async (req: JwtRequest, res, next) => {
  const id = Number(req.params.id)
  if (!id) {
    console.error('Invalid user id')
    return res.status(400).send('Bad request')
  }
  if (!req.auth?.sub) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    await db.userCanEdit(id, req.auth?.sub)
    await db.deleteUserById(id)
    res.sendStatus(StatusCodes.GONE)
  } catch (err) {
    next(err)
  }
})
export default router
