'use client'
import { Buildings, Calendar, Money2, MessageEdit, People, Buliding } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
          Overview
        </p>

        <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

          <Link href='/staff' >
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <People size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Staffs</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
              </div>
            </div>
          </Link>

          <Link href='/hotels' >
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <Buildings size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Total Rooms</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
              </div>
            </div>
          </Link>

          <Link href='/bookings' >
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <Buliding size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Available Rooms</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
              </div>
            </div>
          </Link>

          <Link href="/bookings">
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <MessageEdit size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Booking Request</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
              </div>
            </div>
          </Link>

          <Link href='/bookings' >
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <Calendar size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Running Booking</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
              </div>
            </div>
          </Link>

          <Link href='/bookings/payments' >
            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
              <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                <Money2 size={24} className='text-[#D4AA00]' variant='Bold' />
              </div>
              <div className='block text-center md:text-left gap-3'>
                <p className='text-sm leading-6 text-[#636363]'>Total Payment</p>
                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>NGN 100K</p>
              </div>
            </div>
          </Link>

        </div>


      </div>
    </main>
  )
}
