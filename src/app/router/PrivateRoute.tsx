import { ModuleRoute } from 'module-routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStoreState } from 'store/store'

export interface PrivateRouteInterface {
    children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteInterface> = ({ children }) => {
    const { user } = useSelector((state: AppStoreState) => state.app)

    return (user)
        ? children
        : <Navigate to={ModuleRoute.Auth} />
}

export default PrivateRoute