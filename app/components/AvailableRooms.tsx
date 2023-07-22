'use client'
import { useRouter } from "next/navigation"
import { AvailableRoom } from "../models/availableRoom"
import { ArrowLeft2 } from "iconsax-react"
import Link from "next/link"

export default function AvailableRooms({ availableRooms }: { availableRooms: AvailableRoom[] }) {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }
    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex flex-col items-end gap-y-2 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Available for booking
                </p>

                <div className='flex justify-end gap-2 w-full'>
                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                    <Link href='/bookings/book-room'>
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

                {availableRooms.map(({ id, roomNumber, roomType }) => (
                    <div key={id} className="box rounded-2xl bg-[#FFF] border border-[#E4E4E4] flex justify-center flex-col items-center md:items-center p-4 md:p-5 pb-6 md:pb-8 gap-4 h-auto">

                        <div className='relative flex items-center justify-center'>
                            <div className='bg-[#F6F6F6] border border-[#F6F6F6] w-14 h-14 rounded-full'></div>

                            <div className='absolute flex flex-col items-center justify-center text-[#636363] font-medium text-base'>
                                {roomNumber}
                            </div>
                        </div>

                        <span className='text-sm text-center font-medium text-[#636363]'>Room Type: {roomType}</span>

                    </div>
                ))}

            </div>
        </div>
    )
}