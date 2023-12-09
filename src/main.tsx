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
import { WinnerCardUser } from "./pages/user-view/winner-card-user";
import MerchantFormCreatePage from "./pages/merchant/merchantFormCreate";
import GiftPage from "./pages/gift";
import LoginPage from "./pages/auth/login";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

const token = localStorage.getItem("accessToken");

const routesForPublic = [
  {
    path: "/home",
    element: <HomeUserPage />,
  },
  {
    path: "/generate-qr",
    element: <GenerateQrPage />,
  },
  {
    path: "user/winner/:ktp",
    element: <WinnerCardUser />,
  },
];

const routesForAuthenticatedOnly = [
  {
    element: <ProtectedRoutes />,
    path: "/",
    children: [
      {
        element: <HomePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
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
            element: <MerchantFormCreatePage />,
          },
          {
            path: "/redeem-code",
            element: <ReedemCodeListPage />,
          },
          {
            path: "/winner",
            element: <WinnerListPage />,
          },
          {
            path: "/gift",
            element: <GiftPage />,
          },
        ],
      },
      {
        path: "/winner/:code",
        element: <WinnerFormPage />,
      },
    ],
  },
];

const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter([
  ...routesForPublic,
  ...(!token ? routesForNotAuthenticatedOnly : []),
  ...routesForAuthenticatedOnly,
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
