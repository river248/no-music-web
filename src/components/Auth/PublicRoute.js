import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from './Auth'

function PublicRoute() {

    const token = getToken()
    const location = useLocation()

    return !token ? <Outlet/> : <Navigate to={'/'} replace state={{ from: location }}/>
}

export default PublicRoute
