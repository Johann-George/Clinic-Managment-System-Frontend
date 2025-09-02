import React, {useEffect} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth-context'

function ProtectedRoute({allowedRoles}) {
    const {isAuthenticated, user} = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }  

    if(allowedRoles && !allowedRoles.includes(user?.role)){
        throw new Response(
            "You do not have permission to access this page",
            { status: 403 }
        );
    }
    
    return <Outlet/>;
}

export default ProtectedRoute