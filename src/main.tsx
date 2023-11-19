import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error/error";
import VisitorFormCreatePage from "./pages/visitor/visitorFormCreate";
import MerchantListPage from "./pages/merchant/merchantList";
import WinnerListPage from "./pages/winner/winnerList";
import WinnerFormPage from "./pages/winner/winnerForm";
import { ThemeProvider } from "@/components/theme-provider";
import VisitorListPage from "./pages/visitor/visitorList";
import Scanqr from "./pages/scanQr";
import GenerateQrPage from "./pages/user-view/generate-qr";
import HomeUserPage from "./pages/user-view/home-user";
import ReedemCodeListPage from "./pages/redeemCodeList";

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
        element: <VisitorFormCreatePage />,
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
        element: <ReedemCodeListPage />,
      },
      {
        path: "/winner",
        element: <WinnerListPage />,
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
  {
    path: "/test",
    element: <h1>test</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
