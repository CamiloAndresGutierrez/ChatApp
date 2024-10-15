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
  const { user, refetchCurrentUser, isLoadingUser } = useBoundStore();
  const shouldRefetch = !!authToken && !user.id;

  useEffect(() => {
    if (shouldRefetch) {
      refetchCurrentUser();
    }
  }, [user.id]);

  if (isLoadingUser || shouldRefetch) {
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
