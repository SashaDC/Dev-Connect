import db from './connection.ts'

export async function getAllUsers() {
  const users = await db('users').select()
  return users
}

export async function getUserById(id: number | string) {
  const user = await db('users').select().first().where({ id })
  return user
}

export async function addUser(data: {
  auth_id: string
  email: string
  username?: string
  full_name?: string
  image?: string
}) {
  const [id] = await db('users').insert(data).returning('id')
  return db('users').where({ id }).first()
}

export async function getUserByAuthId(auth_id: string) {
  return db('users').where({ auth_id }).first()
}

export async function updateUserInfo(
  updateInfo: { field: string; value: string },
  authId: string,
) {
  await db('users')
    .where('auth_id', authId)
    .update(updateInfo.field, updateInfo.value)
}

export async function deleteUserById(id) {
  return db('users').where({ id }).delete()
}

export async function userCanEdit(id, auth0Id) {
  return db('users')
    .where({ id })
    .first()
    .then((user) => {
      if (!user || user.auth_id !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
