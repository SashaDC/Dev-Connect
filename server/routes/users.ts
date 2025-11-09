import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/users.ts'

const router = Router()

router.patch('/', async (req, res) => {
  try {
    const updateInfo = req.body.updateInfo
    const authId = req.body.authId
    await db.updateUserInfo(updateInfo, authId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
