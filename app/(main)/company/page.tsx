import { makeApiCall } from '@/app/helpers/apiRequest';
import React, { Suspense } from 'react'
import Loading from '../loading';
import Link from 'next/link';
import Companies from '@/app/components/Companies';
import { Company } from '@/app/models/company';
import { getUserInfo } from '@/app/lib/helpers';

async function getCompanies(hotelId: string) {
  const res = await makeApiCall(`Company/Hotel/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

const CompaniesPage = async() => {
    const { hotelId } = await getUserInfo();    
    const companies: Company[] = await getCompanies(hotelId) as Company[]

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
        <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Companies
        </p>

        <div className='flex justify-end gap-2 w-full'>

          <input
            type='text'
            // onChange={(e) => handleSearch(e.target.value)}
            placeholder='eg. Daniel'
            className='w-1/2 h-9 border-[1.2px] border-gray-300 text-sm font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
          />
          <Link href='/company/new'>
            <button
              type="button"
              className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
            >
              Add Company
            </button>
          </Link>

        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Companies companies={companies} />
      </Suspense>

    </div>
  )
}

export default CompaniesPage
