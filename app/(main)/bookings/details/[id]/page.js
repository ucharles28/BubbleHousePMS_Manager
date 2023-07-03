'use client'
import Loading from '@/app/(main)/loading';
import BookingDetails from '@/app/components/BookingDetails';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';
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
  const router = useRouter()
  const { hotelId } = await getUserInfo()
  let booking = {}
  let availbleRooms = []
  if (param) {
    booking = await getBookingDetails(param.params.id)
    availbleRooms = await getAvailableRooms(booking, hotelId)
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
        <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Booking details of {booking?.code}
        </p>

        <div
          onClick={goBack}
          className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
          <ArrowLeft2 size={14} />
          <span className="text-xs font-medium leading-6">Back</span>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <BookingDetails booking={booking} availableRooms={availbleRooms} />
      </Suspense>
    </div>
  )
}

export default BookingDetailsPage;