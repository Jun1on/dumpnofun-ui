import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config/index";
import { ContextProvider } from "@/context/index";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Dump No Fun",
  description: "Ape tokens with peace of mind",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className="bg-dark">
        <ContextProvider initialState={initialState}>
          <div className="h-screen w-full gap-0 justify-center align-center pt-16 z-1">
            <Header />
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
