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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
