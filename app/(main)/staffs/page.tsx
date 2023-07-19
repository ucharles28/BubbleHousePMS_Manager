import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { StaffResponse } from '@/app/models/staffResponse';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../loading';
import Staffs from '@/app/components/Staffs';

async function getStaffs(hotelId: string) {
  const res = await makeApiCall(`User/Staff/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function StaffsPage() {
  const { hotelId } = await getUserInfo()
  const staffs: StaffResponse[] = await getStaffs(hotelId) as StaffResponse[]

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
        <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Staffs
        </p>

        <div className='flex justify-end gap-2 w-full'>

          <input
            type='text'
            // onChange={(e) => handleSearch(e.target.value)}
            placeholder='eg. Daniel'
            className='w-1/2 h-9 border-[1.2px] border-gray-300 text-sm font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
          />
          <Link href='/staffs/new'>
            <button
              type="button"
              className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
            >
              Add Staff
            </button>
          </Link>

        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Staffs staffs={staffs} />
      </Suspense>

    </div>
  )
}

export default StaffsPage