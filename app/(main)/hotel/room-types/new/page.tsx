import Loading from '@/app/(main)/loading';
import AddRoomType from '@/app/components/AddRoomType';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Amenity } from '@/app/models/amenity';
import { Complement } from '@/app/models/complement';
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
    const { hotelId } = await getUserInfo()
    const amentiesData = getAmenties(hotelId)
    const complementsData = getComplements(hotelId)

    const [amenties, complements] = await Promise.all([amentiesData, complementsData])

    return (
            <Suspense fallback={<Loading />}>
                <AddRoomType amenties={amenties as Amenity[]} complements={complements as Complement[]} hotelId={hotelId}/>
            </Suspense>
    );
}

export default AddRoomTypePage;
