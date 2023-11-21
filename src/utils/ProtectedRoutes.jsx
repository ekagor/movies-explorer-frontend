import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = (props) => {
  return props.isLoggedInto ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
};

export default ProtectedRoutes;
