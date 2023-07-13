import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft2, Eye } from 'iconsax-react'
import { makeApiCall } from '@/app/helpers/apiRequest';
import Loading from '../../loading';
import { getUserInfo } from '@/app/lib/helpers';
import { BookingResponse } from '@/app/models/bookingResponse';
import BookingsTable from '@/app/components/BookingsTable';
import { useRouter } from 'next/navigation';

async function getPendingBookings(hotelId: string) {
  const res = await makeApiCall(`Booking/Hotel/Pending/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function PendingBookingsPage() {
  const { hotelId } = await getUserInfo()
  const bookings: BookingResponse[] = await getPendingBookings(hotelId) as BookingResponse[]
  
  return (
    <Suspense fallback={<Loading />}>
      <BookingsTable bookings={bookings} title='Booking Requests' />
    </Suspense>
  )
}

export default PendingBookingsPage;