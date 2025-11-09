import request from 'superagent'

const rootURL = new URL(`/api/v1/users`, document.baseURI)

// update certain piece of user info

export async function updateUserInfo(updateInfo: {field: string, value: string}, authId: string): Promise<void> {
  try {
    await request.patch(`${rootURL}/`).send({authId: authId, updateInfo: updateInfo})
  } catch (error) {
    console.log("Unable to update")
  }

}
