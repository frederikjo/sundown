import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "../UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
