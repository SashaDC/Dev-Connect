import request from 'superagent'
import { Post, NewPost} from '../../models/posts'

// fetch and/or create posts

const rootURL = new URL(`/api/v1/posts`, document.baseURI)

export async function getAllPosts(): Promise<Post[]> {
  const response = await request.get(rootURL)
  return response.body.posts as Post[]
}

// post by id

export async function getPostById(id: number): Promise<Post> {
  const response = await request.get(`${rootURL}/${id}`)
  return response.body as Post
}

// add new post - CRITICAL need to confirm this all works!!!

export async function createPost(newPostData: NewPost, token: string): Promise<number> {
  try {
    const response = await request
      .post(rootURL)
      .set('Authorization', `Bearer ${token}`) // handles the security side..
      .set('Content-Type', 'application/json')
      .send(newPostData)

    // Server sends Location header - so cool. just read about this and how it returns the full url with a new id
    const locationHeader = response.header.location
    if (locationHeader) {
      const id = Number(locationHeader.split('/').pop()) // just like in fundamentals where split and pop work
      if (!isNaN(id)) return id
    }

    // Case 2: server sends { id: number } in body - just extra checks to make sure id is created and not an empty post
    if (response.body?.id) return response.body.id

    throw new Error('Post created, but failed to retrieve ID.')
  } catch (error) {
    console.error('Failed to create post:', error)
    throw new Error('Unable to create post')
  }
}

// Update post - CRITICAL

export const updatePost = async (
  id: number, 
  updatedData: Partial<Post>,
  token: string
): Promise<Post | null> => {
  try {
    const response = await request
      .patch(`${rootURL}/${id}`)
      .set('Authorization', `Bearer ${token}`) // Critical! 
      .send(updatedData)


    return response.body || null
  } catch (error) {
    console.error('Failed to update the post:', error)
    throw new Error('Unable to update post')
  }
}

// Delete Post - CRITICAL

export const deletePost = async (id: number, token: string) => {
  try {
    await request
      .delete(`/api/v1/posts/${id}`)
      .set('Authorization', `Bearer ${token}`)      // CRITICAL: Must include the JWT for authentication and authorization
      
  } catch (error) {
    console.error('Failed to delete post:', error)
    throw new Error('Unable to delete post') 
  }
}