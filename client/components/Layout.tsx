import { Outlet } from 'react-router'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light text-slate-900">
      <header className="bg-brand-dark shadow">
        <NavBar />
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-xs opacity-60">
        DevConnect © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
