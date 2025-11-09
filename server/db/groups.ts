import db from './connection.ts'

import type { Group, GroupMember, CreateGroup } from '../../models/groups.ts'

export async function listGroups(): Promise<
  (Group & { member_count: number })[]
> {
  const rows = await db('groups as g')
    .leftJoin('group_members as gm', 'g.id', 'gm.group_id')
    .groupBy('g.id')
    .select('g.*')
    .count({ member_count: 'gm.id' })
    .orderBy('g.created_at', 'desc')

  return rows.map((r: any) => ({ ...r, member_count: Number(r.member_count) }))
}

export async function getGroupById(id: number): Promise<Group | undefined> {
  return db<Group>('groups').where({ id }).first()
}

export async function createGroup(input: CreateGroup) {
  return await db.transaction(async (trx) => {
    const [groupId] = await trx('groups').insert({
      name: input.name.trim(),
      description: input.description ?? null,
      is_private: !!input.is_private,
      owner_id: input.ownerId,
    })

    await trx('group_members').insert({
      group_id: groupId,
      user_id: input.ownerId,
      role: 'owner',
    })

    return trx<Group>('groups').where({ id: groupId }).first()
  })
}

export async function joinGroup(userId: number, groupId: number) {
  try {
    const [id] = await db('group_members').insert({
      group_id: groupId,
      user_id: userId,
      role: 'member',
    })
    return db<GroupMember>('group_members').where({ id }).first()
  } catch (err: any) {
    if ((err.message || '').includes('UNIQUE')) {
      return db<GroupMember>('group_members')
        .where({ group_id: groupId, user_id: userId })
        .first()
    }
    throw err
  }
}

export async function leaveGroup(userId: number, groupId: number) {
  const member = await db<GroupMember>('group_members')
    .where({ user_id: userId, group_id: groupId })
    .first()
  if (!member) return { removed: false }

  if (member.role === 'owner') {
    const otherOwners = await db<GroupMember>('group_members')
      .where({ group_id: groupId, role: 'owner' })
      .andWhereNot({ user_id: userId })
    if (otherOwners.length === 0) {
      const e = new Error(
        'Owner cannot leave without transferring ownership',
      ) as any
      e.status = 400
      throw e
    }
  }

  const removed = await db('group_members')
    .where({ user_id: userId, group_id: groupId })
    .del()
  return { removed: removed > 0 }
}

export async function deleteGroup(groupId: number, userId: number) {
  // Verify the user is the owner first
  const group = await db('groups').where({ id: groupId }).first()
  if (!group) {
    const err: any = new Error('Group not found')
    err.status = 404
    throw err
  }

  if (group.owner_id !== userId) {
    const err: any = new Error('Only the owner can delete this group')
    err.status = 403
    throw err
  }

  // Delete memberships first (if not cascaded)
  await db('group_members').where({ group_id: groupId }).del()

  // Delete the group
  await db('groups').where({ id: groupId }).del()

  return { success: true, deletedGroupId: groupId }
}
