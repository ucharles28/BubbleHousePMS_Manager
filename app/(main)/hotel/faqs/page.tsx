import { Suspense } from 'react';
import Loading from '../../loading';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { FAQ } from '@/app/models/faq';
import FAQsTable from '@/app/components/FAQsTable';


async function getFAQs(hotelId: string) {
    const res = await makeApiCall(`FAQ/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function FAQsPage() {
    const { hotelId } = await getUserInfo()
    const faqs: FAQ[] = await getFAQs(hotelId) as FAQ[]
    

    return (
            <Suspense fallback={<Loading />}>
                <FAQsTable faqs={faqs} hotelId={hotelId} />
            </Suspense>
    )
}

export default FAQsPage;