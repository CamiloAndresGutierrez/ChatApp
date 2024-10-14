import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBoundStore } from "./store";
import { useEffect } from "react";
import localStorage from "./utils/localStorage";
import routes from "./router";

function App() {
  const { user, refetchCurrentUser } = useBoundStore();

  useEffect(() => {
    const authToken = localStorage.getAuthToken();
    if (!!authToken && !user.id) {
      refetchCurrentUser();
    }
  }, [user.id]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes({ user: user })} />
    </QueryClientProvider>
  );
}

export default App;
