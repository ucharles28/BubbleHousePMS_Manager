import { Suspense } from 'react';
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingResponse } from '@/app/models/bookingResponse';
import BookingsTable from '@/app/components/BookingsTable';

async function getAllBookings(hotelId: string) {
  const res = await makeApiCall(`Booking/Hotel/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }
  return [];
}

async function AllBookingsPage() {
  const { hotelId } = await getUserInfo()
  const bookings: BookingResponse[] = await getAllBookings(hotelId) as BookingResponse[]

  return (
    <Suspense fallback={<Loading />}>
      <BookingsTable bookings={bookings} title='Total Bookings' />
    </Suspense>
  )
}

export default AllBookingsPage;