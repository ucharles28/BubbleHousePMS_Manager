'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft2 } from 'iconsax-react'
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function BookingDetails() {
  const goBack = () => {
    router.back()
  }
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [userStatus, setUserStatus] = useState(['Active', 'Banned']);

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
        <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Booking details of 'booking-number'
        </p>

        <div
          onClick={goBack}
          className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
          <ArrowLeft2 size={14} />
          <span className="text-xs font-medium leading-6">Back</span>
        </div>
      </div>

      <div className='flex flex-col gap-y-11 w-full'>
        <div className='grid grid-cols-2 md:grid-cols-4 w-full justify-between gap-6 md:gap-8 bg-white border border-[#E4E4E4] p-4 py-5 rounded-lg'>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Booking Number</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>SCRWAQJ1C3PG</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Room Type</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>1 Mini, 2 Executive</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>No of Rooms</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>2</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Check-In</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>02-02-2023</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Child</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>0</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Adults</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>2</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Check-Out</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>02-02-2023</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Guest Name</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>Chijioke Emechebe</p>
          </div>

          <div className='flex flex-col gap-2 md:col-span-1 col-span-2'>
            <p className='text-sm font-normal text-[#636363]'>Guest Email</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>Chijiokeemechebe@gmail.com</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Guest Phone</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>012345789</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Payment Method</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              Premise
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Total</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              NGN 36,560
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Total Paid</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              None
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Payment Status</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              Paid
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Identification Type</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              National I.D
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Estimated Arrival Time</p>
            <p className='text-sm font-medium text-[#1A1A1A]'>
              12:00 PM
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-normal text-[#636363]'>Special Request</p>
            <p
              className='text-sm font-medium text-[#D4AA00] hover:underline cursor-pointer'
              onClick={handleClickOpen}
            >
              View
            </p>
          </div>

        </div>

        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle
            className='font-poppins'
            sx={{
              padding: "16px",
              fontSize: "1rem",
              letterSpacing: "0rem",
              fontWeight: "600",
              width: "auto",
              color: "#364a63",
            }}
          >
            Special Request
          </DialogTitle>
          <DialogContent
            sx={{
              padding: "16px",
              textAlign: 'justify',
            }}
            className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'
          >
            <DialogContentText className='text-sm font-normal leading-5 text-gray-600'>
              Velit pariatur nostrud exercitation duis qui officia id cupidatat laboris consectetur et culpa exercitation. Aliqua cillum nostrud officia incididunt aute et esse dolor ut labore occaecat commodo commodo voluptate. Minim et occaecat eu commodo elit laboris irure eu excepteur aliqua duis non occaecat. Sit consectetur nisi irure aliquip mollit officia labore ipsum do. Exercitation ea sunt et velit aliqua ex est non non. Est pariatur proident cillum ex est est ipsum ut. Do ullamco voluptate qui nostrud ullamco aute officia non ullamco dolore occaecat.
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>

          <div className='flex flex-col gap-5 w-full'>

            <div className="flex flex-col space-y-1" >
              <label className='text-xs font-medium leading-5 text-gray-700'>Room Number</label>
              <select
                className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
              >
                <option className='placeholder:text-xs text-sm'>101</option>
                <option className='placeholder:text-xs text-sm'>102</option>
                <option className='placeholder:text-xs text-sm'>103</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1" >
              <label className='text-xs font-medium leading-5 text-gray-700'>Booking Status</label>
              <select
                className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text-[#636363] placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
              >
                {userStatus.map((stat) => <option className='placeholder:text-xs text-sm'>{stat}</option>)}
              </select>
            </div>

          </div>

          <div className='w-full bg-yellow-200'>Hello</div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails;