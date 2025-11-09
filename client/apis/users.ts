import request from 'superagent'

const rootURL = new URL(`/api/v1/users`, document.baseURI)

export async function getAllUsers() {
  const response = await request.get(rootURL)
  return response.body
}

export async function getUserById(id: number) {
  const response = await request.get(`${rootURL}/${id}`)
  return response.body
}

export async function syncUser({ token, ...userData }) {
  const response = await request
    .post('/api/v1/users/sync')
    .set('Authorization', `Bearer ${token}`)
    .send(userData)
  return response.body
}
