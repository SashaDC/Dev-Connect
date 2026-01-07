


import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/posts.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()

 res.json({ posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong with getting all posts' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.getPostById(req.params.id)
    res.json(post)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  
// const userId = req.auth?.sub  - to add this once we have users and confirm the name of column
  if (!req.auth?.sub ) {   // swap with if (!userId)
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  try {
    const { title, content, mediaType, mediaURL } = req.body  // make sure this matches
    
    const newPost = {
      userId: userId, // CRITICAL: Absolutely need this!!!
      title,
      content,
      mediaType,
      mediaURL,
      // i don't think we need to have timestamps here, but to test. added as CRITICAL just in caseS
    }    
    const id = await db.addPost(newPost)
    res
      .setHeader('Location', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

export default router
