import React, {useEffect} from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser} from "../store/auth-slice"

function ProtectedRoute({allowedRoles}) {
    console.log(allowedRoles);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

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