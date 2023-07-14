import { Suspense } from 'react';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import RoomsTable from '@/app/components/RoomsTable';

async function getRooms(hotelId: string) {
    const res = await makeApiCall(`Room/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function RoomPage() {
    const { hotelId } = await getUserInfo()
    const rooms: any[] = await getRooms(hotelId) as any[]
    
    return (
        <Suspense fallback={<Loading />}>
            <RoomsTable rooms={rooms} />
        </Suspense>
    )
}

export default RoomPage;