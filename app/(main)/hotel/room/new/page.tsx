import Loading from "@/app/(main)/loading";
import AddRoom from "@/app/components/AddRoom";
import { makeApiCall } from "@/app/helpers/apiRequest";
import { getUserInfo } from "@/app/lib/helpers";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

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
    const router = useRouter();
    const { hotelId } = await getUserInfo()
    const bedTypesData = getBedTypes(hotelId)
    const roomTypesData = getRoomTypes(hotelId)

    const [bedTypes, roomTypes] = await Promise.all([bedTypesData, roomTypesData])

    const goBack = () => {
        router.back();
    };

    return(
        <div className="min-h-screen w-full py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-y-1 w-full">
                <p className="block md:w-full text-xl font-medium text-[#1A1A1A] leading-6">
                    Add room
                </p>

                <div
                    onClick={goBack}
                    className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft2 size={14} />
                    <span className="text-xs font-medium leading-6">Back</span>
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                <AddRoom bedTypes={bedTypes} roomTypes={roomTypes} hotelId={hotelId}/>
            </Suspense>
        </div>
    )
}