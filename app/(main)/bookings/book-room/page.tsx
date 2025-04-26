import React, { Suspense } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft2 } from 'iconsax-react';
import Button from '@/app/components/RoomSelector';
import { getUserInfo } from '@/app/lib/helpers';
import { makeApiCall } from '@/app/helpers/apiRequest';
import BookRoom from '@/app/components/BookRoom';
import Loading from '../../loading';

async function getRoomTypes(hotelId: string) {
    const res = await makeApiCall(`RoomType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

type Props = {}

async function BookRoomPage({ }: Props) {
    const { hotelId } = await getUserInfo()
    // const roomTypes: any[] = await getRoomTypes(hotelId);
    return (
        <Suspense fallback={<Loading />}>
            <BookRoom hotelId={hotelId} />
        </Suspense>
    )
}

export default BookRoomPage;