import { Suspense } from 'react';
import RoomTypesTable from '@/app/components/RoomTypesTable';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';

async function getRoomTypes(hotelId: string) {
    const res = await makeApiCall(`RoomType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function RoomTypesPage() {
    const { hotelId } = await getUserInfo()
    const roomTypes: any[] = await getRoomTypes(hotelId) as any[]


    return (
        <Suspense fallback={<Loading />}>
            <RoomTypesTable roomTypes={roomTypes} />
        </Suspense>
    )
}

export default RoomTypesPage;