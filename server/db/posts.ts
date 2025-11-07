import db from './connection.ts'
import { Post, newPost } from '../../models/posts'

export async function getAllPosts() {
  const posts  = await db('posts').select()
  return posts as Post[]
}

export async function getPostById(id: number | string) {
  const posts = await db('posts').select().first().where({ id })
  return posts as Post
}

export async function addPost(data: postData) {
  const [id] = await db('posts').insert(data)
  return id
}
