'use client'
import Link from "next/link"
import { TodayBooked } from "../models/todaysBooked"
import { useRouter } from "next/navigation"
import { ArrowLeft2 } from "iconsax-react"

export default function TodaysBooked({ todaysBookings, children }: { todaysBookings: TodayBooked[], 
    children: React.ReactNode
 }) {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }
    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Today booked
                </p>

                <div className='flex justify-end gap-2 w-full'>

                    {/* <input
              type='text'
              placeholder='eg. Daniel'
              className='w-1/2 h-9 border-[1.2px] border-gray-300 text-sm font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
            /> */}
                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                    <Link href='/bookings'>
                        <button
                            type="button"
                            className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        >
                            Book room
                        </button>
                    </Link>

                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>
                {todaysBookings.map(({ id, bookingCode, roomNumber, customerFullName, roomType }) => (
                    <div key={id} className="box rounded-2xl bg-[#FFF]  border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                        <div className='p-4 bg-[#FFFBEB]  border border-[#FFE580] rounded-full justify-center'>
                            {roomNumber}
                        </div>
                        <div className='block text-center md:text-left gap-3'>
                            <p className='text-sm leading-6 font-medium text-[#636363]'>{customerFullName}</p>
                            <p className='text-[9px] md:text-[11px] leading-10 font-normal text-[#1a1a1a]'>Booking Number: {bookingCode}</p>
                            <p className='text-[9px] md:text-[11px] leading-10 font-normal text-[#1a1a1a]'>Room Type: {roomType}</p>
                        </div>
                        <Link href="">
                            <button className="border border-[#E4E4E4] rounded-md bg-[#1a1a1a14] p-1 text-[11px]">
                                View
                            </button>
                        </Link>
                    </div>
                ))}

            </div>

            {children}
        </div>
    )
}