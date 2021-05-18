import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./components/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
};

export default App;
