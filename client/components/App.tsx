import { useAuth0 } from '@auth0/auth0-react' // revert back on launch.
// import { useMockableAuth } from '../hooks/useMockAuth' // delete when ready for launch
import { useEffect, useRef } from 'react'
import { useSyncUser } from '../hooks/useFetchUser.ts'
import Layout from './Layout.tsx'

// This is our App component it should either show a login/sign up page
// or the layout that contains everything to do with the site.

export default function App() {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    user,
    logout,
  } = useAuth0()
  const syncUserMutation = useSyncUser()
  const hasSynced = useRef(false) // create the ref to track if sync has run

  // To this:
  // const { isAuthenticated, loginWithRedirect, isLoading, logout } =
  //   useMockableAuth()

  // LEFT BELOW CODE THE SAME - BYPASS FOR AUTH0 DURING DEV
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  // Sync user once
  useEffect(() => {
    const syncUser = async () => {
      if (!hasSynced.current && isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently()
          syncUserMutation.mutate({
            token,
            email: user.email,
            username: user.nickname,
            full_name: user.name,
            image: user.picture,
          })
          hasSynced.current = true
        } catch (err) {
          console.error('Failed to sync user', err)
        }
      }
    }
    syncUser()
  }, [user, isAuthenticated, syncUserMutation, getAccessTokenSilently])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        Redirecting to login...
      </div>
    )
  }

  return (
    <>
      <Layout />
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Log Out
      </button>
    </>
  )
}
