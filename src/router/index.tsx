import App from '../App.tsx'
import Discover from "../screens/discover.tsx";
import Saved from "../screens/saved.tsx";
import { Route, Routes } from "react-router-dom"
import { auth } from '../fireBaseCom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";

export const RoutesForTheApp = () => {
  const [user] = useAuthState(auth)
  return (
    <Routes>
      {/* <Route path="/" element={<Home/>}> */}
      <Route path="/" element={<App />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/saved" element={!!user?<Saved />:<Navigate to='/' />} />
    </Routes>
  )
}