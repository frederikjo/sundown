import React from "react";
import type { AppProps } from "next/app";
import { UserProvider, useUser } from "../UserContext";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import "@/global.css";

function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <AppContent
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    </UserProvider>
  );
}

function AppContent({ Component, pageProps }: AppProps) {
  const { user } = useUser();

  return (
    <div
      className={
        user
          ? "bg-gray-300 min-h-screen bg-starry"
          : "bg-gray-900 min-h-screen bg-starry"
      }
    >
      {user ? (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
