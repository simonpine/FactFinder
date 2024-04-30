import { createBrowserRouter } from "react-router-dom";
import App from '../App.tsx'
import Discover from "../screens/discover.tsx";
import Saved from "../screens/saved.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
    },
    {
        path: '/discover',  
        element: <Discover />,
    },
    {
        path: '/saved',  
        element: <Saved />,
    }
])