'use client'
import React, { useState } from 'react'
import { makeApiCall } from '@/app/helpers/apiRequest'
import { CircularProgress } from '@mui/material'
import { message } from 'antd'
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation'

const CreateCompany = ({hotelId}: {hotelId: string}) => {
    const router = useRouter()
    const goBack = () => {
        router.back()
      }
    
      const [isLoading, setIsLoading] = useState(false);
      const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        hotelId: hotelId
      })
    
      async function saveCompany() {
        setIsLoading(true)
        const response = await makeApiCall('Company', 'POST', formData)
        if (response.successful) {
          message.success('Company created successfully')
          resetFormData()
        } else {
          message.error(String(response.data))
        }
    
        setIsLoading(false)
      }

      function resetFormData(){
        setFormData({
            name: '',
            contactPerson: '',
            email: '',
            phone: '',
            address: '',
            hotelId: hotelId
          })
      }

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-y-1 w-full'>
          <p className='block md:w-full text-lg font-medium text-[#1A1A1A] leading-6'>
            Add Company
          </p>
  
          <div
            onClick={goBack}
            className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
            <ArrowLeft2 size={14} />
            <span className="text-xs font-medium leading-6">Back</span>
          </div>
        </div>
  
        <div className='flex flex-col gap-3 w-full'>
  
        <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Name</label>
            <input
              type='text'
              placeholder=''
              value={formData.name}
              onChange={(e) => setFormData((prevState) => ({...prevState, name: e.target.value}))}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
        </div> 
        <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Contact Person</label>
            <input
              type='text'
              placeholder=''
              value={formData.contactPerson}
              onChange={(e) => setFormData((prevState) => ({...prevState, contactPerson: e.target.value}))}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
        </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div className="flex flex-col space-y-1" >
              <label className='text-xs font-medium leading-5 text-gray-700'>Email</label>
              <input
                type='email'
                placeholder='eg. Staff@mybcloud.com'
                value={formData.email}
                onChange={(e) => setFormData((prevState) => ({...prevState, email: e.target.value}))}
                className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
              />
            </div>
  
            <div className="flex flex-col space-y-1" >
              <label className='text-xs font-medium leading-5 text-gray-700'>Phone</label>
              <input
                type='phone'
                placeholder='08099231023'
                value={formData.phone}
                onChange={(e) => setFormData((prevState) => ({...prevState, phone: e.target.value}))}
                className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
              />
            </div>
          </div>
  
          <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Address</label>
            <input
              type='text'
              value={formData.address}
              onChange={(e) => setFormData((prevState) => ({...prevState, address: e.target.value}))}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div> 
  
          <div className="flex flex-col items-center w-full gap-4 mt-5">
            <button
              type="button"
              className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#FFDD55] disabled:bg-[#FFDD55]"
              disabled={!formData.address || !formData.contactPerson || !formData.email || !formData.phone || !formData.name || isLoading}
              onClick={saveCompany}
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
            </button>
  
          </div>
  
        </div>
      </div>
  )
}

export default CreateCompany
