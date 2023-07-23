import Loading from "@/app/(main)/loading";
import AddRoom from "@/app/components/AddRoom";
import { makeApiCall } from "@/app/helpers/apiRequest";
import { getUserInfo } from "@/app/lib/helpers";
import { Suspense, use } from "react";

async function getRoomTypes(hotelId: string) {
    const res = await makeApiCall(`RoomType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function getBedTypes(hotelId: string) {
    const res = await makeApiCall(`BedType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

export default async function AddRoomPage() {
    const { hotelId } = await getUserInfo()
    const bedTypes = await getBedTypes(hotelId)
    const roomTypes = await getRoomTypes(hotelId)

    return(
            <Suspense fallback={<Loading />}>
                <AddRoom bedTypes={bedTypes} roomTypes={roomTypes} hotelId={hotelId}/>
            </Suspense>
    )
}