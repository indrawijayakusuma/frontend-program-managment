import { Navigate, Outlet } from "react-router-dom";
// import { RootState } from "../redux/store";
// import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  // const isLogin = useSelector((state: RootState) => state.login.isLoggedIn);
  // localStorage.setItem("isLogin", JSON.stringify(isLogin));
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
