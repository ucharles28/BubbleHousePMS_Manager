'use client'
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StaffResponse } from "../models/staffResponse";
import { makeApiCall } from "../helpers/apiRequest";
import { message } from "antd";
import { CircularProgress } from "@mui/material";

export default function StaffDetails({ staff }: { staff: StaffResponse }) {
  const goBack = () => {
    router.back()
  }
  const router = useRouter()

  const [userRoles, setUserRoles] = useState(['Manager', 'Staff']);
  const [userStatus, setUserStatus] = useState(['Active', 'Deactivated']);
  const [selectedRole, setSelectedRole] = useState(staff.accountType === 2 ? 'Manager' : 'Staff');
  const [selectedStatus, setSelectedStatus] = useState(staff.accountStatus === 0 ? 'Active' : 'Deactivated');
  const [firstName, setFirstName] = useState(staff.fullName.split(' ')[0]);
  const [lastName, setLastName] = useState(staff.fullName.split(' ')[1]);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phoneNumber);
  const [isLoading, setIsLoading] = useState(false);


  async function updateStaff() {
    setIsLoading(true)
    const req = {
      firstName,
      lastName,
      accountType: selectedRole,
      accountStatus: selectedStatus === 'Active' ? 0 : 1,
      phoneNumber: phone,
      email
    }

    const response = await makeApiCall(`User/Staff/Update/${staff.id}`, 'PUT', req)

    if (response.successful) {
      message.success('Staff updated successfully')
      router.push('/staffs')
    } else {
      message.error(String(response.data))
    }

    setIsLoading(false)
  }

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
        <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Information on staff-{staff.fullName}
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>

          <div className="flex flex-col space-y-1" >
            <label className='text-xs font-medium leading-5 text-gray-700'>Lastname</label>
            <input
              type='text'
              placeholder='eg. Mybcloud'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
          <input
            type='email'
            placeholder='eg. Staff@mybcloud.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
          <input
            type='phone'
            placeholder='eg. 0123456789'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          />
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>User Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          >
            {userRoles.map((rol) => <option className='placeholder:text-xs text-sm'>{rol}</option>)}
          </select>
        </div>

        <div className="flex flex-col space-y-1" >
          <label className='text-xs font-medium leading-5 text-gray-700'>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
          >
            {userStatus.map((stat) => <option className='placeholder:text-xs text-sm'>{stat}</option>)}
          </select>
        </div>

        <div className="flex flex-col items-center w-full gap-4 mt-5">
          <button
            type="button"
            onClick={updateStaff}
            disabled={!firstName || !lastName || !email || !phone || !selectedRole || !selectedStatus || isLoading}
            className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#FFDD55]"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
          </button>

        </div>

      </div>
    </div>
  )
}