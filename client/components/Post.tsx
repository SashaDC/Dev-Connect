interface PostProps {
  post: {
    id: number
    title: string
    content: string
    author?: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <article className="bg-brand border-brand-dark/40 space-y-2 rounded-lg border p-4 shadow-sm transition hover:shadow-md">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-sm opacity-80">{post.content}</p>
      {post.author && (
        <p className="text-xs opacity-60">Posted by {post.author}</p>
      )}
    </article>
  )
}
