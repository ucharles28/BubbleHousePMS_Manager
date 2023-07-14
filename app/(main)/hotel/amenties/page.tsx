import { Suspense } from 'react';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Amenity } from '@/app/models/amenity';
import AmenitiesTable from '@/app/components/AmenitiesTable';

async function getAmenties(hotelId: string) {
    const res = await makeApiCall(`Amenity/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function AmenitiesPage() {
    const { hotelId } = await getUserInfo()
    const amenties: Amenity[] = await getAmenties(hotelId) as Amenity[]

    return (
        <Suspense fallback={<Loading />}>
            <AmenitiesTable amenities={amenties} />
        </Suspense>
    )
}

export default AmenitiesPage;