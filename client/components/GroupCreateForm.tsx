import { useState } from 'react'
import * as api from '../apis/groups'

export default function GroupCreateForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [devUserId] = useState<number>(() => {
    const saved = localStorage.getItem('devUserId')
    return saved ? Number(saved) : 1
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await api.createGroup({ name, description }, devUserId) // <-- pass userId
      setName('')
      setDescription('')
      alert('Group created')
    } catch (e: any) {
      const msg = e?.response?.body?.message ?? String(e)
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-2 p-4">
      <input
        className="rounded border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group name"
      />
      <textarea
        className="rounded border p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button
        disabled={busy || !name.trim()}
        className="rounded border px-3 py-1"
      >
        {busy ? 'Creating…' : 'Create group'}
      </button>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </form>
  )
}
