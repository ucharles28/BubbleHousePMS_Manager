'use client'
import { LegacyRef, forwardRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import logo from '../logo.png'
import { Setting2, People, Notification, Buildings2, Calendar, Messages2, Category, LogoutCurve, Money2, Building4 } from 'iconsax-react';
import { logOutUser } from "../lib/helpers";

const sidebarLinks = [
    { path: "/", label: "Dashboard", icon: Category },
    { path: "/staffs", label: "Staffs", icon: People },
    { path: "/company", label: "Companies", icon: Building4, isAdmin: true },
    { path: "/bookings", label: "Bookings", icon: Calendar },
    { path: "/hotel", label: "Manage Hotel", icon: Buildings2 },
    { path: "/notifications", label: "Notifications", icon: Notification },
    { path: "/settings", label: "Settings", icon: Setting2 }
];

const SideBar = forwardRef(({ showNav }: { showNav: boolean }, ref: LegacyRef<HTMLDivElement>) => {
    const logOut = async() => {
        await logOutUser()
        router.push('/login');
    };
    const router = useRouter();
    const pathname = usePathname();

    const isLinkActive = (linkPath: string) => {
        if (linkPath === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(linkPath) && pathname !== "/";
    };

    return (
        <div ref={ref} className="md:flex hidden flex-col fixed z-20 w-72 h-full bg-white shadow-sm border-dashed border-r-[1.5px] border-[#E4E4E4]">
            <div className="flex justify-center mt-4 mb-12">
                <Image src={logo} width={100} height={100} alt='mybcloud manager' />
            </div>

            <div className="flex flex-col gap-y-4 px-2 text-sm">
                {sidebarLinks.map(({ path, label, icon: Icon }) => (
                    <Link key={path} href={path}>
                        <div
                            className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${isLinkActive(path)
                                ? "bg-[#fff7d8] text-[#D4AA00] rounded-xl"
                                : "text-[#636363] hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-xl"
                                }`}
                        >
                            <Icon className="h-5 w-5" variant="Bold" />
                            <p className="">{label}</p>
                        </div>
                    </Link>
                ))}

                <div
                    className={`px-5 py-3 text-center cursor-pointer flex items-center gap-3 transition-colors ${isLinkActive("/#")
                        ? "bg-red-500 text-white rounded-xl"
                        : "text-[#636363] hover:bg-red-500 hover:text-white rounded-xl"
                        }`}
                    onClick={logOut}
                >
                    <LogoutCurve className="h-5 w-5" variant="Bold" />
                    <p className="">Log Out</p>
                </div>
            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;
