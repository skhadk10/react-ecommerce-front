import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";
const PrivateRoute = ({ children }) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={{ pathname: "/signin" }} replace />
  );
};
export default PrivateRoute;
