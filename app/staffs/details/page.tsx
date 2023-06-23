'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';

function NewStaff() {
  const goBack = () => {
    router.back()
  }
  const router = useRouter()

  const [userRoles, setUserRoles] = useState(['Admin', 'Manager', 'Staff', 'Customer']);
  const [userStatus, setUserStatus] = useState(['Active', 'Banned']);

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
        <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Information on staff-'firstName'
        </p>

        <div
          onClick={goBack}
          className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
          <ArrowLeft2 size={14} />
          <span className="text-xs font-medium leading-6">Back</span>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-full'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Firstname</label>
            <input
              type='text'
              placeholder='eg. Developer'
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>

          <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Lastname</label>
            <input
              type='text'
              placeholder='eg. Mybcloud'
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
          <input
            type='email'
            placeholder='eg. Staff@mybcloud.com'
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
          <input
            type='phone'
            placeholder='eg. 0123456789'
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>User Role</label>
          <select
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          >
            {userRoles.map((rol) => <option className='placeholder:text-xs text-sm'>{rol}</option>)}
          </select>
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Status</label>
          <select
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          >
            {userStatus.map((stat) => <option className='placeholder:text-xs text-sm'>{stat}</option>)}
          </select>
        </div>

        <div className="flex flex-col items-center w-full gap-4 mt-5">
          <button
            type="button"
            className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#FFDD55]"
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewStaff