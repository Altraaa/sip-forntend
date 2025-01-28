import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  console.log("Token found. Access granted.");
  return <>{children}</>;
};

export default ProtectedRoute;
