import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav className="flex items-center gap-6 bg-slate-900 p-4 text-white shadow-md">
      <Link className="hover:opacity-80" to="/">
        Home
      </Link>
      <Link className="hover:opacity-80" to="/groups">
        Groups
      </Link>
      <Link className="cursor-not-allowed opacity-50 hover:opacity-80" to="#">
        My Profile
      </Link>
      <Link className="hover:opacity-80" to="/login">
        Login
      </Link>
    </nav>
  )
}
