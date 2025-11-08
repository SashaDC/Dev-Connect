import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import HomeFeed from './components/HomeFeed.tsx'
import Profile from './components/Profile.tsx'
import Profiles from './components/Profiles.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomeFeed />} />
    <Route path="profile/:id" element={<Profile />} />
    <Route path="profiles" element={<Profiles />} />
  </Route>,
)
