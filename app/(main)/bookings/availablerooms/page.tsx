"use client"
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft2, Eye } from 'iconsax-react'
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingResponse } from '@/app/models/bookingResponse';
import { useRouter } from 'next/navigation';
import TodaysBooked from '@/app/components/TodaysBooked';
import AvailableRooms from '@/app/components/AvailableRooms';
import { TodayBooked } from '@/app/models/todaysBooked';
import { AvailableRoom } from '@/app/models/availableRoom';


async function getAvailableRooms(hotelId: string) {
    const res = await makeApiCall(`Room/Hotel/Available/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

export default async function TodayBookedPage() {
    const router = useRouter()
    const { hotelId } = await getUserInfo()
    const availableRooms = await getAvailableRooms(hotelId) as AvailableRoom[]

    const goBack = () => {
        router.back()
    }

    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Available for booking
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

            <Suspense fallback={<Loading />}>
                <AvailableRooms availableRooms={availableRooms as AvailableRoom[]} />
            </Suspense>
        </div>
    )
}