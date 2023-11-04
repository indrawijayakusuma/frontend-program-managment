import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import VisitorPage from "./pages/visitor";
import MerchantPage from "./pages/merchant";
import ReedemPage from "./pages/redeemCode";
import WinnerPage from "./pages/winner";
import HomeUserPage from "./pages/homeUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/visitor",
        element: <VisitorPage />,
      },
      {
        path: "/merchant",
        element: <MerchantPage />,
      },
      {
        path: "/redeem-code",
        element: <ReedemPage />,
      },
      {
        path: "/winner",
        element: <WinnerPage />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeUserPage />,
  },
  {
    path: "/app-visitor",
    element: <h1>halo world</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
