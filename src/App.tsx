import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBoundStore } from "./store";
import localStorage from "./utils/localStorage";
import routes from "./router";
import LoadingPage from "./components/LoadingPage";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const queryClient = new QueryClient();
  const authToken = localStorage.getAuthToken();
  const {
    user,
    refetchCurrentUser,
    isLoadingUser,
    subscription,
    createSubscription,
    removeSubscription,
  } = useBoundStore();
  const shouldRefetch = !!authToken && !user.id;
  const authenticatedUser = !isLoadingUser && !!user.id;

  useEffect(() => {
    if (shouldRefetch) {
      refetchCurrentUser();
    }
  }, [user.id]);

  useEffect(() => {
    if (authenticatedUser && !subscription?.length) {
      createSubscription();
    }
  }, [authenticatedUser, subscription]);

  useEffect(() => {
    return () => removeSubscription();
  }, []);

  if (isLoadingUser) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes({ user: user })} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
