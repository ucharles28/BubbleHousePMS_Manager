'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Buildings, Calendar, Money2, MessageEdit, Notepad2, Slash, CalendarTick } from 'iconsax-react';

function BookingsPage() {
  const dashboardCards = [
    { title: 'Today Booked', url: '/staffs', icon: Notepad2, value: 10 },
    { title: 'Running Bookings', url: '/staffs', icon: Calendar, value: 10 },
    { title: 'Booking Request', url: '/staffs', icon: MessageEdit, value: 10 },
    { title: 'Available Rooms', url: '/staffs', icon: Buildings, value: 10 },
    { title: 'Cancelled Bookings', url: '/staffs', icon: Slash, value: 10 },
    { title: 'Total Bookings', url: '/staffs', icon: CalendarTick, value: 10 },
    { title: 'Total Payments', url: '/staffs', icon: Money2, value: 'NGN 100K' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-6'>
          Bookings
        </p>

        <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

          {dashboardCards.map(({ url, title, icon: Icon, value }) => (
            <Link href={url} key={url}>
              <div className="box rounded-2xl bg-white  border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                  <Icon size={24} className='text-[#636363]' variant='Bold' />
                </div>
                <div className='block text-center md:text-left gap-3'>
                  <p className='text-sm leading-6 font-medium text-[#636363]'>{title}</p>
                  <p className='text-xl md:text-2xl leading-10 font-semibold text-[#1a1a1a]'>{value}</p>
                </div>
              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
  )
}

export default BookingsPage;