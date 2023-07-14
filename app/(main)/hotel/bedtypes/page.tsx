import { Suspense } from 'react';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { BedType } from '@/app/models/bedtype';
import BedTypesTable from '@/app/components/BedTypesTable';

async function getBedTypes(hotelId: string) {
    const res = await makeApiCall(`BedType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function BedTypesPage() {
    const { hotelId } = await getUserInfo()
    const bedTypes: BedType[] = await getBedTypes(hotelId) as BedType[]
    return (
        <Suspense fallback={<Loading />}>
            <BedTypesTable bedTypes={bedTypes} hotelId={hotelId} />
        </Suspense>
    )
}

export default BedTypesPage;