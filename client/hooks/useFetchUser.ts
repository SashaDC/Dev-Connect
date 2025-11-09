import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllUsers, getUserById, syncUser } from '../apis/users.ts'

export function useGetAllUsers() {
  const query = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  return query
}

export const useGetUserById = (id: number) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })

export const useSyncUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: syncUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
}
