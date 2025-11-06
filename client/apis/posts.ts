import request from 'superagent'

// fetch and/or create posts

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getFruits(): Promise<string[]> {
  const response = await request.get(`${rootURL}/fruits`)
  return response.body.fruits as string[]
}
