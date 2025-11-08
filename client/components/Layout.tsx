import { Outlet } from 'react-router'
import NavBar from './NavBar'
// import WeatherWidget from "./WeatherWidget"
// This layout component holds all basic components
// The outlet is for the main content such as posts, feed, etc.

// Note:
// Possibly make header/footer a seperate component to keep it tidy in this one?
export default function Layout() {
  return (
    <>
      <header className="p-4 text-center text-xl font-bold">
        <h1>DevConnect</h1>
        {/* (optional header content here) */}
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-xs opacity-60">
        {/* Footer content here later */}
      </footer>
    </>
  )
}
