export type Group = {
  id: number
  name: string
  description?: string
  is_private: boolean
  owner_id: number
  created_at: string
  updated_at: string
  member_count?: number
}

export type GroupMember = {
  id: number
  group_id: number
  user_id: number
  role: 'owner' | 'admin' | 'member'
  joined_at: string
}

export type CreateGroup = {
  name: string
  description?: string
  is_private?: boolean
  ownerId: number
}

export type JoinResult =
  | { status: 'joined'; membership: GroupMember }
  | { status: 'already-member'; membership: GroupMember }

export type LeaveResult =
  | { status: 'left'; removed: true }
  | { status: 'not-member'; removed: false }
