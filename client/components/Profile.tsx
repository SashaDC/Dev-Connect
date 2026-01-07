import { useParams } from 'react-router'
import { useGetUserById } from '../hooks/useFetchUser'

export default function Profile() {
  const { id } = useParams()
  const { isLoading, isError, error, data: user } = useGetUserById(id)
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>{error.message}</p>
  }
  return (
    <div>
      <img src={user.image} alt={`${user.username}'s pfp`} />
      <p>{user.full_name}</p>
      <p>{user.username}</p>
      <p>{user.location}</p>
      <p>{user.bio}</p>
    </div>
  )
}
