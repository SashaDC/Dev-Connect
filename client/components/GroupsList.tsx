import { useEffect, useState } from 'react'
import * as api from '../apis/groups'

export default function GroupsList() {
  const [groups, setGroups] = useState<api.Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState<number | null>(null)

  // dev user switcher (for testing prior to auth)
  const [devUserId, setDevUserId] = useState<number>(() => {
    const saved = localStorage.getItem('devUserId')
    return saved ? Number(saved) : 1
  })

  async function loadGroups() {
    setLoading(true)
    try {
      const gs = await api.listGroups(devUserId)
      setGroups(gs)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadGroups()
  }, [devUserId])

  async function handleJoin(id: number) {
    setBusy(id)
    try {
      await api.joinGroup(id, devUserId)
      await loadGroups()
    } finally {
      setBusy(null)
    }
  }

  async function handleLeave(id: number) {
    setBusy(id)
    try {
      await api.leaveGroup(id, devUserId)
      await loadGroups()
    } finally {
      setBusy(null)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this group? This cannot be undone.')) return
    setBusy(id)
    try {
      await api.deleteGroup(id, devUserId)
      await loadGroups()
    } catch (e: any) {
      const msg = e?.response?.body?.message ?? String(e)
      alert(msg) // e.g., "Only the owner can delete this group"
    } finally {
      setBusy(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Header devUserId={devUserId} setDevUserId={setDevUserId} />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <Header devUserId={devUserId} setDevUserId={setDevUserId} />

      <div className="grid grid-cols-1 gap-4">
        {groups.map((g) => (
          <article
            key={g.id}
            className="shadow-soft rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-sky/60 ring-fog/60 flex h-10 w-10 items-center justify-center rounded-full font-semibold text-slate-700 ring-4">
                  {g.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-6 text-slate-900">
                    {g.name}
                  </h3>
                  {g.description && (
                    <p className="mt-1 text-sm text-slate-600">
                      {g.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-mint/60 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {g.member_count ?? 0} members
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  disabled={busy === g.id}
                  onClick={() => handleJoin(g.id)}
                  className="bg-mint/60 hover:bg-mint/70 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 disabled:opacity-50"
                >
                  Join
                </button>
                <button
                  disabled={busy === g.id}
                  onClick={() => handleLeave(g.id)}
                  className="bg-sky/60 hover:bg-sky/70 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 disabled:opacity-50"
                >
                  Leave
                </button>
                {g.owner_id === devUserId && (
                  <button
                    disabled={busy === g.id}
                    onClick={() => handleDelete(g.id)}
                    className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                    title="Delete group (owner only)"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ---------- small subcomponents ---------- */

function Header({
  devUserId,
  setDevUserId,
}: {
  devUserId: number
  setDevUserId: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
      {/* dev-only switcher; remove in prod */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-600">Dev user</span>
        <select
          className="rounded-md border border-slate-300 bg-white px-2 py-1"
          value={devUserId}
          onChange={(e) => {
            const id = Number(e.target.value)
            setDevUserId(id)
            localStorage.setItem('devUserId', String(id))
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="shadow-soft rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="bg-fog h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="bg-fog h-4 w-40 rounded" />
          <div className="bg-fog h-3 w-72 rounded" />
          <div className="bg-fog h-6 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}
