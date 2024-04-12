// src/pages/_app.tsx

import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../queryClient";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
