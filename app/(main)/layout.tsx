'use client'
import '../globals.css'
import { Poppins } from 'next/font/google'
import { useState, useEffect, Fragment } from "react";
import SideBar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Transition } from "@headlessui/react";
import NProgress from '../components/NProgress';
import "react-calendar/dist/Calendar.css";

// export const metadata: Metadata = {
//   title: 'MyBcloud',
// }

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['devanagari', 'latin', 'latin-ext'],
  preload: true
})

export default function RootLayout({
  children
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
      <body className={poppins.className}>
        <NProgress />
        <div className="min-h-screen flex flex-col">

          <div className="w-full h-full flex-1 flex-col justify-between">
            {/* Header */}
            <TopBar showNav={showNav} setShowNav={setShowNav} />

            {/* Main Content */}
            <main
              className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "md:pl-72" : ""
                }`}
            >
              <div className="px-4 bg-[#f6f6f6] min-h-screen">
                {children}
              </div>
            </main>

          </div>

          {/* Footer */}
          <footer
            className={`transition-all duration-[400ms] bg-[#F6F6F6] border-dashed border-t-[1.5px] border-[#E4E4E4] flex w-full py-3 ${showNav && !isMobile ? "md:pl-72 " : ""
              }`}
          >
            <span className='block text-xs font-medium leading-7 text-left px-2 text-[#636363]'>
            Copyright Mybcloud &copy; {new Date().getFullYear()}
            </span>
          </footer>

          {/* Sidebar */}
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