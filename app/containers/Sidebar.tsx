'use client'
import { LegacyRef, forwardRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import logo from '../logo.png'
import { Setting2, People, Notification, Buildings2, Calendar, Messages2, Category, LogoutCurve, Money2 } from 'iconsax-react';

const SideBar = forwardRef(({ showNav }: {showNav: boolean}, ref: LegacyRef<HTMLDivElement>) => {
    const logOut = () => {
        router.push('/auth/login');
    }
    const router = useRouter()
    const pathname = usePathname()
    const [box5, setBox5] = useState(false)

    // keep router.pathname alive when routes is in sub page
    // if (router.pathname?.includes("/staffs")) {
    //     router.pathname = "/staffs";
    // } else if (router.pathname?.includes("/hotel")) {
    //     router.pathname = "/hotel";
    // } else if (router.pathname?.includes("/bookings")) {
    //     router.pathname = "/bookings";
    // } else if (router.pathname?.includes("/notifications")) {
    //     router.pathname = "/notifications";
    // } else if (router.pathname?.includes("/settings")) {
    //     router.pathname = "/settings";
    // } else {
    //     router.pathname = "/";
    // }

    return (
        <div ref={ref} className="md:flex hidden flex-col fixed z-20 w-72 h-full bg-white shadow-sm border-dashed border-r-[1.5px] border-[#E4E4E4]">
            <div className="flex justify-center mt-4 mb-12">
                <Image src={logo} width={100} height={100} alt='mybcloud manager' />
            </div>

            <div className="flex flex-col gap-y-4 px-2 text-sm">
                <Link href="/">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Category className="h-5 w-5" variant="Bold" />
                        <p className="">Dashboard</p>
                    </div>
                </Link>

                <Link href="/staffs" >
                    {/* onClick={() => setBox5(!box5)} */}
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/staffs"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <People className="h-5 w-5" variant="Bold" />
                        <p className="">Staffs</p>
                    </div>
                </Link>
                {/* {box5 && (
                    <div className="bg-[#ffcc00]/20 rounded-md flex flex-col gap-2 text-sm font-normal leading-5">
                        <p>All Users </p>
                        <p>All Users </p>
                        <p>All Users </p>
                        <p>All Users </p>
                    </div>
                )} */}

                <Link href="/bookings">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/bookings"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Calendar className="h-5 w-5" variant="Bold" />
                        <p className="">Bookings</p>
                    </div>
                </Link>

                <Link href="/hotel">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/hotel"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Buildings2 className="h-5 w-5" variant="Bold" />
                        <p className="">Manage Hotel</p>
                    </div>
                </Link>

                <Link href="/notifications">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/notifications"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Notification className="h-5 w-5" variant="Bold" />
                        <p className="">Notifications</p>
                    </div>
                </Link>

                <Link href="/settings">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/settings"
                            ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                            : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                            }`}
                    >
                        <Setting2 className="h-5 w-5" variant="Bold" />
                        <p className="">Settings</p>
                    </div>
                </Link>

                <Link href="/#">
                    <div
                        className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${pathname == "/#"
                            ? "bg-red-500 text-white rounded-xl"
                            : "text-[#636363] hover:bg-red-500 hover:text-white rounded-xl"
                            }`}
                        onClick={logOut}
                    >
                        <LogoutCurve className="h-5 w-5" variant="Bold" />
                        <p className="">Log Out</p>
                    </div>
                </Link>

            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;