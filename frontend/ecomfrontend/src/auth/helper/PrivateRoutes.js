import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

export const PrivateRoutes = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};