import { Suspense } from 'react';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Complement } from '@/app/models/complement';
import ComplementsTable from '@/app/components/ComplementsTable';

async function getComplements(hotelId: string) {
    const res = await makeApiCall(`Complement/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function ComplementsPage() {
    const { hotelId } = await getUserInfo()
    const complements: Complement[] = await getComplements(hotelId) as Complement[]

    return (
        <Suspense fallback={<Loading />}>
            <ComplementsTable complements={complements} hotelId={hotelId} />
        </Suspense>
    )
}

export default ComplementsPage;