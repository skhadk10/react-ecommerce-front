import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";
const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to={{ pathname: "/signin" }} replace />
  );
};
export default AdminRoute;
