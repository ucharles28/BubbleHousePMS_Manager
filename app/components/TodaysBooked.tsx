'use client'
import Link from "next/link"
import { TodayBooked } from "../models/todaysBooked"
import { useRouter } from "next/navigation"
import { ArrowLeft2 } from "iconsax-react"

export default function TodaysBooked({ todaysBookings, children }: {
    todaysBookings: TodayBooked[],
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

                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                    <Link href='./bookings/book-room'>
                        <button
                            type="button"
                            className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        >
                            Book room
                        </button>
                    </Link>

                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-4 md:gap-x-10 gap-y-6'>
                {todaysBookings.map(({ id, bookingCode, roomNumber, customerFullName, roomType }) => (
                    <div key={id} className="rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-5 pb-6 md:pb-8 gap-5 h-auto">
                        <div className='relative flex items-center justify-center'>

                            <div className='bg-[#fff7d8] border border-[#FFDD55] w-14 h-14 rounded-full'></div>

                            <div className='absolute flex flex-col items-center justify-center text-[#D4AA00] font-medium text-base'>
                                {roomNumber}
                            </div>

                        </div>

                        <div className='flex flex-col justify-start w-full gap-2 text-[#636363] md:text-left text-center'>
                            <span className='text-xs font-medium text-[#1A1A1A]'>{customerFullName}</span>
                            <span className='text-xs font-medium'>
                                Booking Number: {bookingCode}
                            </span>
                            <span className='text-xs font-medium'>
                                Room Type: {roomType}
                            </span>
                        </div>

                    </div>
                ))}

            </div>

            {children}
        </div>
    )
}