'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { useState, useEffect, Fragment } from "react";
import SideBar from './containers/Sidebar';
import TopBar from './containers/TopBar';
import { Transition } from "@headlessui/react";

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
        <div className="h-screen flex flex-row justify-start">

          <div className="w-full h-full flex-1 flex-col justify-between">
            <TopBar showNav={showNav} setShowNav={setShowNav} />
            <main
              className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "md:pl-72" : ""
                }`}
            >
              <div className="px-4 bg-[#f6f6f6] min-h-screen">
                {children}
              </div>
            </main>
          </div>

          <Transition
            as={Fragment}
            show={showNav}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <SideBar showNav={showNav} />
          </Transition>
        </div>
      </body>
    </html>
  )
}