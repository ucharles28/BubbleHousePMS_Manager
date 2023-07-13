'use client'
import '../globals.css'
import { Inter } from 'next/font/google'
import { useState, useEffect, Fragment } from "react";
import NProgress from '../components/NProgress';
// import { Metadata } from 'next'


// export const metadata: Metadata = {
//   title: 'MyBcloud',
// }

const inter = Inter({ subsets: ['latin'] })

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
        <NProgress />
        {children}
      </body>
    </html>
  )
}