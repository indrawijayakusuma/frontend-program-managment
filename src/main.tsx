import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import VisitorPage from "./pages/visitor";
import MerchantListPage from "./pages/merchantList";
import ReedemPage from "./pages/redeemCode";
import WinnerPage from "./pages/winner";
import WinnerFormPage from "./pages/winnerForm";
import { ThemeProvider } from "@/components/theme-provider";
import VisitorListPage from "./pages/visitorList";
import Scanqr from "./pages/scanQr";
import GenerateQrPage from "./pages/generate-qr";
import HomeUserPage from "./pages/home-user";

const router = createBrowserRouter([
  {
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <h1>home</h1>,
      },
      {
        path: "/scan-qr",
        element: <Scanqr />,
      },
      {
        path: "/visitor/list",
        element: <VisitorListPage />,
      },
      {
        path: "/visitor/create",
        element: <VisitorPage />,
      },
      {
        path: "/merchant/list",
        element: <MerchantListPage />,
      },
      {
        path: "/merchant/create",
        element: <h1>merchant create</h1>,
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
    path: "/generate-qr",
    element: <GenerateQrPage />,
  },
  {
    path: "/winner/:code",
    element: <WinnerFormPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
