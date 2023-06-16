'use client'
import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';

function NewStaff() {
  const goBack = () => {
    router.back()
  }
  const router = useRouter()

  const [userRoles, setUserRoles] = useState(['Admin', 'Manager', 'Staff', 'Customer']);

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
          Add Staff
        </p>

        <div className='flex justify-end gap-2 w-full'>
          <div
            onClick={goBack}
            className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
            <ArrowLeft2 size={14} />
            <span className="text-xs font-medium leading-6">Back</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full'>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Firstname</label>
          <input
            type='text'
            placeholder='eg. Developer'
            className='bg-white w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Lastname</label>
          <input
            type='text'
            placeholder='eg. Mybcloud'
            className='bg-white w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
          <input
            type='email'
            placeholder='eg. Staff@mybcloud.com'
            className='bg-white w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
          <input
            type='phone'
            placeholder='eg. 0123456789'
            className='bg-white w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>User Role</label>
          <select
            className='bg-white w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
          >
            {userRoles.map((rol) => <option>{rol}</option>)}
          </select>
        </div>

        <div className="flex items-center w-full gap-4">
          <button
            type="button"
            className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
          >
            Save
          </button>

          <button
            type="button"
            className="text-[#666666] font-medium flex items-center px-3 py-1.5 rounded-md border-[#1a1a1a]/50 border text-xs leading-6 uppercase hover:bg-[#636363] hover:text-white"
            onClick={goBack}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewStaff