import { usePosts } from '../hooks/useFetchPosts'
import Post from './Post'
import WeatherWidget from './WeatherWidget.tsx'

export default function HomeFeed() {
  const { data: posts, isLoading, error } = usePosts()

  if (isLoading) return <p>Loading posts...</p>
  if (error)
    return <p className="text-red-500">Something went wrong loading posts.</p>

  return (
    <div className="space-y-6">
      {/* Optional: keep weather widget visible at top */}
      <WeatherWidget />

      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
