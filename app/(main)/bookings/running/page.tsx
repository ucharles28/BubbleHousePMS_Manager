import { Suspense } from 'react';
import Link from 'next/link';
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingResponse } from '@/app/models/bookingResponse';
import BookingsTable from '@/app/components/BookingsTable';

async function getRunningBookings(hotelId: string) {
  const res = await makeApiCall(`Booking/Hotel/Running/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function RunningBookingsPage() {
  const { hotelId } = await getUserInfo()
  const bookings: BookingResponse[] = await getRunningBookings(hotelId) as BookingResponse[]

  return (
    <Suspense fallback={<Loading />}>
      <BookingsTable bookings={bookings} title='Running booking'/>
    </Suspense>
  )
}

export default RunningBookingsPage;