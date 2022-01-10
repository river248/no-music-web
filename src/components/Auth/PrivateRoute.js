import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from './Auth'

function PrivateRoute() {

    const token = getToken()
    const location = useLocation()

    return token ? <Outlet/> : <Navigate to={'/account'} replace state={{ from: location }}/>
}

export default PrivateRoute
