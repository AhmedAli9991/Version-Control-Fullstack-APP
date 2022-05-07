import {  Navigate, Outlet } from "react-router-dom";
import useAuth from "./MyHooks/useAuth";

const ProtectedRoute = () => {
    const {Login} = useAuth();
    

    return (
        Login?<Outlet />: <Navigate to="/" replace />
    );
}

export default ProtectedRoute;