import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/user.jsx";
import BookPage from "./pages/book.jsx";
import TodoPage from "./pages/todo.jsx";
import ErrorPage from "./pages/error.jsx";
import RegisterPage from "./pages/register.jsx";
import AuthContextWapper from "./components/context/auth.context.jsx";
import PrivateRouter from "./pages/private.router.jsx";
import "nprogress/nprogress.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoPage />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: (
          <PrivateRouter>
            <BookPage />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextWapper>
    <RouterProvider router={router} />
  </AuthContextWapper>

  // </React.StrictMode>
);
