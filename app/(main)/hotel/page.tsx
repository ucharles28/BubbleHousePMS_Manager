'use client'
import React from 'react';
import ManageHotelOverview from '@/app/components/ManageHotelOverview';

function ManageHotelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-6'>
          Manage Hotel
        </p>

        <ManageHotelOverview />

      </div>
    </main>
  )
}

export default ManageHotelPage;