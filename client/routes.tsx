import { createRoutesFromElements, Route } from 'react-router'

import App from './components/App.tsx'
import Layout from './components/Layout'
import HomeFeed from './components/HomeFeed.tsx'
import GroupsList from './components/GroupsList'
import GroupCreateForm from './components/GroupCreateForm'
import Profile from './components/Profile.tsx'
import Profiles from './components/Profiles.tsx'

export default createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<HomeFeed />} />
    <Route path="groups" element={<GroupsList />} />
    <Route path="groups/new" element={<GroupCreateForm />} />
    <Route path="profile/:id" element={<Profile />} />
    <Route path="profiles" element={<Profiles />} />
  </Route>,
)
