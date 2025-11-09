import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router'
import routes from './routes'
import { Auth0Provider } from '@auth0/auth0-react'

const router = createBrowserRouter(routes) // routes is the route objects array

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-connect.au.auth0.com"
      clientId="ftlOFv7YpoOfBbcMW1iYba5NvNJfcTV7"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://DevConnect/api',
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
