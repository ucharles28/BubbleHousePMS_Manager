'use client'
import { useState } from 'react';
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/app/lib/helpers';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { message } from 'antd';
import { CircularProgress } from '@mui/material';

function NewStaff() {
  const goBack = () => {
    router.back()
  }
  const router = useRouter()

  const [userRoles, setUserRoles] = useState(['Manager', 'Staff']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function saveStaff() {
    setIsLoading(true)
    const { hotelId } = await getUserInfo();
    const req = {
      firstName,
      lastName,
      accountType: selectedRole,
      phoneNumber: phone,
      hotelId
    }

    const response = await makeApiCall('User/Staff/Create', 'POST', req)

    if (response.successful) {
      message.success('Staff created successfully')
      router.push('/staffs')
    } else {
      message.error(String(response.data))
    }

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
        <p className='block md:w-full text-lg font-medium text-[#1A1A1A] leading-6'>
          Add Staff
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
              // placeholder='eg. '
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>

          <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Lastname</label>
            <input
              type='text'
              // placeholder='eg. Mybcloud'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
          <input
            type='email'
            // placeholder='eg. Staff@mybcloud.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
          <input
            type='phone'
            // placeholder='eg. 0123456789'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>User Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          >
            {userRoles.map((rol) => <option className='placeholder:text-xs text-sm'>{rol}</option>)}
          </select>
        </div>

        <div className="flex flex-col items-center w-full gap-4 mt-5">
          <button
            type="button"
            className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#FFDD55] disabled:bg-[#FFDD55]"
            disabled={!firstName || !lastName || !email || !phone || !selectedRole || isLoading}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewStaff