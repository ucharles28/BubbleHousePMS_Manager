'use client'
import Loading from '@/app/(main)/loading';
import AddRoomType from '@/app/components/AddRoomType';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Amenity } from '@/app/models/amenity';
import { Complement } from '@/app/models/complement';
import { ArrowLeft2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

async function getComplements(hotelId: string) {
    const res = await makeApiCall(`Complement`, 'GET')
    // const res = await makeApiCall(`Complement/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function getAmenties(hotelId: string) {
    const res = await makeApiCall(`Amenity`, 'GET')
    // const res = await makeApiCall(`Amenity/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function AddRoomTypePage() {
    const router = useRouter();
    const { hotelId } = await getUserInfo()
    const amentiesData = getAmenties(hotelId)
    const complementsData = getComplements(hotelId)

    const [amenties, complements] = await Promise.all([amentiesData, complementsData])


    const goBack = () => {
        router.back();
    };



    return (
        <div className="min-h-screen w-full py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-y-1 w-full">
                <p className="block md:w-full text-xl font-medium text-[#1A1A1A] leading-6">
                    Add room type
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
                <AddRoomType amenties={amenties as Amenity[]} complements={complements as Complement[]} hotelId={hotelId}/>
            </Suspense>
        </div>
    );
}

export default AddRoomTypePage;
