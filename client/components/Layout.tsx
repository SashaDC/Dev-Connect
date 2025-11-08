import { Outlet } from 'react-router'
import NavBar from './NavBar'
// import WeatherWidget from "./WeatherWidget"

export default function Layout() {
  return (
    <>
      <header className="p-4 text-center text-xl font-bold">
        <h1>DevConnect</h1>
        {/* (optional header content here) */}
      </header>

      <nav>
        <NavBar />
      </nav>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-xs opacity-60">
        {/* Footer content here later */}
      </footer>
    </>
  )
}
