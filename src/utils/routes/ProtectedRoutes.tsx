import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const ProtectedRoute = ({
  children,
  restricted = false,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika pengguna belum login dan halaman bukan login (restricted = false), redirect ke halaman login
    if (!restricted) {
      console.log("No token found. Redirecting to login.");
      return <Navigate to="/login" replace />;
    }
    console.log("Token not found. Access granted to login page.");
    return <>{children}</>;
  }

  // Jika pengguna sudah login dan mencoba mengakses halaman login, redirect ke dashboard atau halaman utama
  if (restricted) {
    console.log("User is already logged in. Redirecting from login page.");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("Token found. Access granted.");
  return <>{children}</>;
};

export default ProtectedRoute;
