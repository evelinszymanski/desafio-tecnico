import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Funcionarios from './pages/Funcionarios'
import ProtectedRoutes from './layout/ProtectedRoutes'

export const router = createBrowserRouter([{
    element: <App />,
    children: [
        { 
            path: '/',
            element: <Navigate to='login' replace />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            element: <ProtectedRoutes />,
            children: [
                {
                    path: "/funcionarios",
                    element: <Funcionarios />
                },
                {
                    path: "/funcionarios/:id",
                    element: <Funcionarios />
                }
            ]
        }
    ]
}])