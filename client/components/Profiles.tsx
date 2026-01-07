import { Link } from 'react-router'
import { useGetAllUsers } from '../hooks/useFetchUser'

export default function Profiles() {
  const { isLoading, isError, error, data } = useGetAllUsers()
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>{error.message}</p>
  }
  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          <Link to={`/profile/${user.id}`}>
            <img src={user.image} alt={`${user.username}'s pfp`} />
            <div>{user.full_name}</div>
            <div>{user.username}</div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
