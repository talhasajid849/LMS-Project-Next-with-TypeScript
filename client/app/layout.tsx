"use client"

import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import React from "react";
import Loader from "./components/Loader/Loader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
           <Custom>{children}</Custom> 
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return (
    <>
    {isLoading ? <Loader /> : <>{children}</>}
    </>
  )
}
