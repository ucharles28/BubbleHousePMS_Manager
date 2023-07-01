import Link from "next/link"
import { TodayBooked } from "../models/todaysBooked"

export default function TodaysBooked({ todaysBookings }: {todaysBookings: TodayBooked[]}) {

    return (
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
    )
}