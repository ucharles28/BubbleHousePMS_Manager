import { Suspense } from 'react';
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { useRouter } from 'next/navigation';
import { AvailableRoom } from '@/app/models/availableRoom';
import AvailableRooms from '@/app/components/AvailableRooms';


async function getAvailableRooms(hotelId: string) {
    const res = await makeApiCall(`Room/Hotel/Available/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

export default async function TodayBookedPage() {
    const { hotelId } = await getUserInfo()
    const availableRooms = await getAvailableRooms(hotelId) as AvailableRoom[]

    return (
        <Suspense fallback={<Loading />}>
            <AvailableRooms availableRooms={availableRooms as AvailableRoom[]} />
        </Suspense>
    )
}