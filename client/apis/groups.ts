import request from 'superagent'
import type { Group, CreateGroup } from '../../models/groups.ts'

const base = '/api/v1/groups'

// Always pass an explicit userId from the caller (your user switcher)
const withUser = (req: request.SuperAgentRequest, userId: number) =>
  req.set('x-user-id', String(userId))

// Optional user-aware fetch (header helps if your server later returns is_member)
export async function listGroups(userId?: number): Promise<Group[]> {
  const req = request.get(base)
  const res = userId ? await withUser(req, userId) : await req
  return res.body.groups as Group[]
}

export async function createGroup(
  input: CreateGroup,
  userId: number,
): Promise<Group> {
  const res = await withUser(request.post(base).send(input), userId)
  return res.body as Group
}

export async function joinGroup(id: number, userId: number) {
  const res = await withUser(request.post(`${base}/${id}/join`), userId)
  return res.body
}

export async function leaveGroup(id: number, userId: number) {
  const res = await withUser(request.post(`${base}/${id}/leave`), userId)
  return res.body
}

export async function deleteGroup(id: number, userId: number) {
  const res = await withUser(request.delete(`${base}/${id}`), userId)
  return res.body
}
