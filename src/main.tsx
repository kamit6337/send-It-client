import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import environment from "./utils/environment.ts";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

const PRODUCTION = "production";

if (environment.NODE_ENV === PRODUCTION) disableReactDevTools();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="send-it-theme">
          <App />
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </BrowserRouter>
);
