import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Funcionarios from './pages/Funcionarios'

export const router = createBrowserRouter([{
    element: <App />,
    children: [
        {
            path: '/',
            element: <Navigate to='login' replace />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/funcionarios',
            element: <Funcionarios />
        },
        {
            path: '/funcionarios/:id',
            element: <Funcionarios />
        }
    ]
}])