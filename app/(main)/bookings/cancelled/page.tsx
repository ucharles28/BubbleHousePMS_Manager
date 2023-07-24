import { Suspense } from 'react';
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingResponse } from '@/app/models/bookingResponse';
import BookingsTable from '@/app/components/BookingsTable';

async function getCancelledBookings(hotelId: string) {
  const res = await makeApiCall(`Booking/Hotel/Cancelled/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function CancelledBookingsPage() {
  const { hotelId } = await getUserInfo()
  const bookings: BookingResponse[] = await getCancelledBookings(hotelId) as BookingResponse[]
  
  return (
    <Suspense fallback={<Loading />}>
      <BookingsTable bookings={bookings} title='Cancelled Bookings' />
    </Suspense>
  )
}

export default CancelledBookingsPage;