import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import ReactGA from "react-ga4";
import environment from "./utils/environment.ts";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

const PRODUCTION = "production";

if (environment.GT4_MEASUREMENT_ID) {
  ReactGA.initialize(environment.GT4_MEASUREMENT_ID);
}

if (environment.NODE_ENV === PRODUCTION) disableReactDevTools();

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
