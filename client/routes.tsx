import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import HomeFeed from './components/HomeFeed.tsx'

export default createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index element={<HomeFeed />} />
    </Route>
)
