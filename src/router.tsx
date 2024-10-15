import { createBrowserRouter, redirect } from "react-router-dom";
import { IUser } from "./types/user";
import Login from "./pages/login";
import NotFoundPage from "./components/ErrorPage";
import Main from "./pages/Main";

const routes = ({ user }: { user: IUser }) => {
  const validateUser = (user: IUser) => (!user.id ? redirect("/login") : null);
  const validateSignOff = () => (user.id ? redirect("/") : null);

  const privateRoutes = [
    {
      path: "/second-route",
      element: <h1>Base root {user.email}</h1>,
    },
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFoundPage />,
    },
  ].map((route) => ({ ...route, loader: () => validateUser(user) }));

  const publicRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
  ].map((route) => ({ ...route, loader: validateSignOff }));

  const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

  return router;
};

export default routes;
