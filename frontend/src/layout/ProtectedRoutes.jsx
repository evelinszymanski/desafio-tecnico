import { Outlet } from 'react-router-dom'
import '../styles/global.css'
import Header from '../components/Header';

function ProtectedRoutes() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
};

export default ProtectedRoutes;