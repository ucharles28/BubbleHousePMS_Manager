import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft2, Eye } from 'iconsax-react'
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { useRouter } from 'next/navigation';
import TodaysBooked from '@/app/components/TodaysBooked';
import AvailableRooms from '@/app/components/AvailableRooms';
import { TodayBooked } from '@/app/models/todaysBooked';
import { AvailableRoom } from '@/app/models/availableRoom';

async function getTodayBooked(hotelId: string) {
    const res = await makeApiCall(`Booking/Hotel/Today/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function getAvailableRooms(hotelId: string) {
    const res = await makeApiCall(`Room/Hotel/Available/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

export default async function TodayBookedPage() {
    const { hotelId } = await getUserInfo()
    const todaysBookingsData = getTodayBooked(hotelId)
    const availableRoomsData = getAvailableRooms(hotelId)

    const [todaysBookings, availableRooms] = await Promise.all([todaysBookingsData, availableRoomsData])


    return (
        <Suspense fallback={<Loading />}>
            <TodaysBooked todaysBookings={todaysBookings as TodayBooked[]} >
                <AvailableRooms availableRooms={availableRooms as AvailableRoom[]} />
            </TodaysBooked>

        </Suspense>
    )
}