import React from "react";
import { Navigate } from "react-router-dom";
import AccessForbidden from "./AccessForbidden";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const verified = localStorage.getItem("jwtToken") || 1;
  return verified ? <Component {...rest} /> : <AccessForbidden />;
};

export default ProtectedRoute;
