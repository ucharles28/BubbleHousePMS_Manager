import Loading from '@/app/(main)/loading';
import BookingDetails from '@/app/components/BookingDetails';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Suspense } from 'react';

async function getBookingDetails(bookingId) {
  const res = await makeApiCall(`Booking/${bookingId}`, 'GET')
  if (res.successful) {
    return res.data
  }
}


async function getAvailableRooms(booking, hotelId) {
  const req = {
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
    hotelId,
    roomTypeId: null
  }
  const res = await makeApiCall(`Room/Hotel/GetAvailableRooms`, 'POST', req)
  if (res.successful) {
    return res.data
  }
}

async function BookingDetailsPage(param) {
  const { hotelId } = await getUserInfo()
  let booking = {}
  let availbleRooms = []
  if (param) {
    booking = await getBookingDetails(param.params.id)
    availbleRooms = await getAvailableRooms(booking, hotelId)
  }



  return (
    <Suspense fallback={<Loading />}>
      <BookingDetails booking={booking} availableRooms={availbleRooms} />
    </Suspense>
  )
}

export default BookingDetailsPage;