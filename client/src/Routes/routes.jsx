import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import ErrorPage from "../components/common/ErrorPage/ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      }
      
    ],
  },
]);
