import request from 'superagent'
import { Post, NewPost} from '../../models/posts'

// fetch and/or create posts

const rootURL = new URL(`/api/v1/posts`, document.baseURI)

export async function getAllPosts(): Promise<string[]> {
  const response = await request.get(`${rootURL}`)
  return response.body.posts as Post[]
}

// post by id

export async function getPostById(id: number): Promise<Post> {
  const response = await request.get(`${rootURL}/${id}`)
  return response.body as Post
}

// add new post - CRITICAL need to confirm this all works!!!

export async function createPost(newPostData: NewPost, token: string): Promise<number> {
  const response = await request
    .post(rootURL)
 
    .set('Authorization', `Bearer ${token}`)     // CRITICAL: Attach the JWT token to the request header
    
    .set('Content-Type', 'application/json')

    .send(newPostData)
    
  return response.status 
}
