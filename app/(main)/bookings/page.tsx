import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingsOverview } from '@/app/models/bookingsOverview';
import { Suspense } from 'react';
import Loading from '../loading';
import HotelBookingsOverview from '@/app/components/HotelBookingsOverview';

async function getBookingsOverview(hotelId: string) {
  const res = await makeApiCall(`Hotel/Booking/Overview/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function BookingsPage() {
  const { hotelId } = await getUserInfo()
  const bookingsOverview: BookingsOverview = await getBookingsOverview(hotelId) as BookingsOverview

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-6'>
          Bookings
        </p>

        <Suspense fallback={<Loading />}>
          <HotelBookingsOverview bookingsOverview={bookingsOverview} />
        </Suspense>

      </div>
    </main>
  )
}

export default BookingsPage;