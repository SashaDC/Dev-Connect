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

export async function updateUserInfo(updateInfo: {field: string, value: string}, authId: string): Promise<void> {
  try {
    await request.patch(`${rootURL}/`).send({authId: authId, updateInfo: updateInfo})
  } catch (error) {
    console.log("Unable to update")
  }

export async function syncUser({ token, ...userData }) {
  const response = await request
    .post('/api/v1/users/sync')
    .set('Authorization', `Bearer ${token}`)
    .send(userData)
  return response.body
}
