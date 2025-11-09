import db from './connection.ts'

export async function updateUserInfo(updateInfo: {field: string, value: string}, authId: string) {
  await db('users').where('auth_id', authId).update(updateInfo.field, updateInfo.value)
}