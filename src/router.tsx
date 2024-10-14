import {
  Routes,
  Route,
  createBrowserRouter,
  Link,
  redirect,
} from "react-router-dom";
import { IUser } from "./types/user";
import Login from "./pages/login";

const routes = ({ user }: { user: IUser }) => {
  const validateUser = () => {
    if (!user.id) return redirect("/");
    return null
  };

  const privateRoutes = [
    {
      path: "/second-route",
      element: <h1>Base root {user.email}</h1>,
    },
    {
      path: "/",
      element: (
        <h1>
          Base root <Link to={"/second-route"}>Go to second route</Link>{" "}
          {user.email}
        </h1>
      ),
    },
  ].map((route) => ({ ...route, loader: validateUser }));

  const router = createBrowserRouter(
    !user.id
      ? [
          {
            path: "/",
            element: <Login />,
          },
        ]
      : privateRoutes
  );

  return router;
};

export default routes;
