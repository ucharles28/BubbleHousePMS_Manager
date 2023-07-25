import { makeApiCall } from "@/app/helpers/apiRequest";
import { getUserInfo } from "@/app/lib/helpers";
import { Suspense } from "react";
import Loading from "../../loading";
import HotelDetails from "@/app/components/HotelDetails";

async function getHotelDetails(hotelId: string) {
    const res = await makeApiCall(`Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return {};
}

export default async function HotelDetailsPage() {
    const { hotelId } = await getUserInfo()
    const hotel = await getHotelDetails(hotelId)

    return (
            <Suspense fallback={<Loading />}>
                <HotelDetails hotelPayload={hotel} />
            </Suspense>
    )
}