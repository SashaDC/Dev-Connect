import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav className="bg-brand-dark flex items-center justify-between px-6 py-4 text-slate-800 shadow">
      <Link className="hover:text-accent transition" to="/">
        Home
      </Link>
      <Link className="hover:text-accent transition" to="/groups">
        Groups
      </Link>
      <Link className="hover:text-accent transition" to="/profile/me">
        Profile
      </Link>
    </nav>
  )
}
