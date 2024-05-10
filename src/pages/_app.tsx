import React, { memo } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { UserProvider, useUser } from "../UserContext";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import "@/global.css";
import clsx from "clsx";

function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <MemoizedAppContent
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    </UserProvider>
  );
}

const AppContent = ({ Component, pageProps }: AppProps) => {
  const { user } = useUser();

  return (
    <div
      className={clsx("min-h-screen bg-starry", {
        "bg-gray-300": user,
        "bg-gray-900": !user,
      })}
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
};

const MemoizedAppContent = memo(AppContent);

export default App;
