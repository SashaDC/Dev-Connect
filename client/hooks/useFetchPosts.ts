import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,

} from '@tanstack/react-query'
import { getAllPosts, getPostById} from '../apis/posts.ts'

export function usePosts() {
  const query = useQuery({ queryKey: ['posts'], queryFn: getAllPosts })
  return query
  
}

export const usePostById = (id: number) =>
  useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostById(id),
    enabled: !!id, // only runs if id is defined and not a 0 or null - it is Truthy
  })

export function usePostsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return mutation
}


