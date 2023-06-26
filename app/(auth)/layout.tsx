'use client'
import '../globals.css'
import '../styles/nprogress.css'
import nProgress from "nprogress"
import { Inter } from 'next/font/google'
import { useState, useEffect, Fragment } from "react";
import Router from "next/router"
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'MyBcloud',
}

const inter = Inter({ subsets: ['latin'] })

Router.events.on("routeChangeStart", nProgress.start)
Router.events.on("routeChangeError", nProgress.done)
Router.events.on("routeChangeComplete", nProgress.done)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
            {children}=
      </body>
    </html>
  )
}