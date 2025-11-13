import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedLayout() {
  useAxiosInterceptor(); // Set up interceptors
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);

  // If no token, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
