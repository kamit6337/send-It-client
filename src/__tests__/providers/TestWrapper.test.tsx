import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

const TestWrapper = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default TestWrapper;
