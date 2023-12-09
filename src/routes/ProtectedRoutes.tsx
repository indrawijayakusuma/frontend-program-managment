import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
