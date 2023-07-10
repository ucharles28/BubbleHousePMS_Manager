'use client'
import { makeApiCall } from "@/app/helpers/apiRequest";
import { getUserInfo } from "@/app/lib/helpers";
import { PropertyPolicy } from "@/app/models/propertyPolicy";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Loading from "../../loading";
import HotelDetails from "@/app/components/HotelDetails";

async function getPropertyPolicy(hotelId: string) {
    const res = await makeApiCall(`PropertyPolicy/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return {};
}

export default async function HotelDetailsPage() {
    const router = useRouter();
    const { hotelId } = await getUserInfo()
    const propertyPolicy: PropertyPolicy = await getPropertyPolicy(hotelId) as PropertyPolicy

    const goBack = () => {
        router.back();
    };

    return (
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
                <HotelDetails propertyPolicyPayload={propertyPolicy} />
            </Suspense>
        </div>
    )
}