import db from './connection.ts'

export async function getAllUsers() {
  const users = await db('users').select()
  return users
}

export async function getUserById(id: number | string) {
  const user = await db('users').select().first().where({ id })
  return user
}

export async function addUser(data) {
  const [id] = await db('users').insert(data)
  return id
}

export async function updateUser(id, user) {} // Your code ravi

export async function deleteUserById(id) {
  return db('users').where({ id }).delete()
}

export async function userCanEdit(id, auth0Id) {
  return db('users')
    .where({ id })
    .first()
    .then((user) => {
      if (user.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
