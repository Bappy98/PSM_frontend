import { selectCurrentToken, selectCurrentUserType } from '@/store/api/auth/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

function RequireAuth({allowedRoles}) {
    const role = useSelector(selectCurrentUserType)
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
  return allowedRoles?.includes(role)?(
    <Outlet/>
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
);
}

export default RequireAuth