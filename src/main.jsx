import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Base from "./components/Base.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import EditBooks from "./components/Editbooks.jsx";
import RegisterBooks from "./components/RegisterBooks.jsx";
import Cart from "./components/Carts.jsx";
import Payment from "./components/PaymentModal.jsx"; // ✅ Added
import OrderSuccess from "./components/OrderSuccess.jsx"; // ✅ Added

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "edit/:id",
        element: <EditBooks />,
      },
      {
        path: "registerbooks",
        element: <RegisterBooks />,
      },
      {
        path: "carts",
        element: <Cart />,
      },
      // {
      //   path: "payment",
      //   element: <Payment />, // ✅ New route
      // },
      {
        path: "ordersuccess",
        element: <OrderSuccess />, // ✅ New route
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
