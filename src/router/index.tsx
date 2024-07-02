import App from '../App.tsx'
import Discover from "../screens/discover.tsx";
import Saved from "../screens/saved.tsx";
import { Route, Routes } from "react-router-dom"
import { auth } from '../fireBaseCom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";
import Error404 from '../screens/404.tsx';

export const RoutesForTheApp = () => {
  const [user] = useAuthState(auth)
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path={"*"} element={<Error404/>}/>
      <Route path="/discover/*" element={<Discover />} />
      <Route path="/saved" element={!!user ? <Saved /> : <Navigate to='/' />} />
    </Routes>
  )
}