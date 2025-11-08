// src/hooks/useMockableAuth.ts

import { useAuth0, User, Auth0ContextInterface } from '@auth0/auth0-react'

// Check for the environment variable
const IS_AUTH_BYPASSED = import.meta.env.VITE_BYPASS_AUTH === 'true'
// (For CRA, use: process.env.REACT_APP_BYPASS_AUTH === 'true')

// 1. Define your fake user data
const mockUser: User = {
  name: 'Dev User',
  email: 'dev@example.com',
  picture: 'https://placehold.co/400x400', // A placeholder avatar
  sub: 'dev-user-123',
}

// 2. Define the fake "logged in" state
// We cast to 'any' to avoid mocking every single function
// in the complex Auth0ContextInterface.
const mockAuth: Auth0ContextInterface = {
  isAuthenticated: true,
  isLoading: false,
  user: mockUser,
  loginWithRedirect: () => Promise.resolve(),
  logout: (options?: any) => {
    console.log('Mock Logout Clicked:', options)
    // Simulate the "returnTo" behavior
    if (options?.logoutParams?.returnTo) {
      window.location.href = options.logoutParams.returnTo
    }
  },
  getAccessTokenSilently: () => Promise.resolve('mock-access-token'),
  // Add any other functions your app uses here
} as any // Using 'as any' simplifies mocking a complex interface

/**
 * A wrapper hook for useAuth0.
 * If VITE_BYPASS_AUTH is 'true', it returns a mock auth state.
 * Otherwise, it returns the real auth state.
 */
export const useMockableAuth = (): Auth0ContextInterface => {
  const realAuth = useAuth0()

  if (IS_AUTH_BYPASSED) {
    return mockAuth
  }

  return realAuth
}
