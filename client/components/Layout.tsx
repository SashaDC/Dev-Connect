import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        {/* header component here */}
      </header>
      <nav>{/* nav component here */}</nav>
      <main>
        {/* this will change based on nav */}
        <Outlet />
      </main>
      <footer>{/* footer component here */}</footer>
    </>
  )
}
