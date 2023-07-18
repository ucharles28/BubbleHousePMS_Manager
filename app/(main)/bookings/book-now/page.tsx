'use client';
import React from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft2 } from 'iconsax-react';
import Button from '@/app/components/RoomSelector';

type Props = {}

function BookRoom({ }: Props) {

    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex flex-col items-end gap-y-2 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Book room
                </p>

                <div className='flex justify-end gap-2 w-full'>
                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>

                </div>
            </div>

            <div className='flex flex-col gap-y-11 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-full'>

                    <div className="flex flex-col gap-1 w-full md:col-span-1">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Room Type</label>
                        <select
                            placeholder='eg. Deluxe'
                            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                        >
                            <option className='placeholder:text-xs text-sm'>
                                Deluxe
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 w-full md:col-span-1">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Date</label>
                        <input
                            type='text'
                            placeholder='eg. 23-07-2023'
                            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full md:col-span-1">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Room</label>
                        <input
                            type='text'
                            placeholder='eg. 2'
                            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                        />
                    </div>

                    <div className="md:col-span-3 w-full mt-3">
                        <button
                            type="button"
                            className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 capitalize hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                        >
                            Search
                        </button>

                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full gap-3'>

                    <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
                        <p className='mb-[0] text-sm text-[#636363] font-medium leading-6 w-full'>Room Selection</p>

                        <div className='flex items-center gap-6 w-full'>
                            <div className='flex items-center gap-1.5 text-xs font-medium tracking-wide text-gray-600'>
                                <span className='w-3 h-3 rounded-full bg-red-500 mb-0.5'></span>
                                Booked
                            </div>

                            <div className='flex items-center gap-1.5 text-xs font-medium tracking-wide text-gray-600'>
                                <span className='w-3 h-3 rounded-full bg-green-500 mb-0.5'></span>
                                Available
                            </div>

                            <div className='flex items-center gap-1.5 text-xs font-medium tracking-wide text-gray-600'>
                                <span className='w-3 h-3 rounded-full bg-[#139CE0] mb-0.5'></span>
                                Selected
                            </div>

                        </div>

                        <div className='w-full bg-[#E8F3F9] p-3 rounded-lg'>
                            <p className='text-xs font-medium leading-6 text-[#0E71A3]'>Every room can be selected or removed by a single click without booking it. Make sure that selected rooms in each date is equal to the number of rooms you have searched.</p>
                        </div>

                        <div className='flex flex-col w-full rounded-t-lg overflow-hidden'>

                            <div className='bg-[#FFE580] grid grid-cols-3 justify-between w-full py-2 px-4'>
                                <p className='mb-[0] text-xs font-medium text-gray-900 col-span-1'>Date</p>
                                <p className='mb-[0] text-xs font-medium text-gray-900 col-span-2 flex justify-end'>Room Number</p>
                            </div>

                            <div className='grid grid-cols-3 justify-between w-full h-auto border-x-[1.2px] border-b-[1.2px] border-[#E4E4E4]'>

                                <p className='col-span-1 mb-[0] py-5 px-3 text-xs font-medium tracking-wide border-r-[1.2px] border-[#E4E4E4]'>
                                    02-02-2023 to 05-02-2023
                                </p>

                                <div className='col-span-2 p-2 flex flex-wrap justify-start gap-3 w-full h-auto'>
                                    <Button variant='booked'>102</Button>
                                    <Button variant='available'>102</Button>
                                    <Button variant='selected'>102</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
                        <p className='mb-[0] text-sm text-[#636363] font-medium leading-6 w-full'>Booking Information</p>

                        <div className='grid grid-cols-1 w-full gap-3'>

                            <div className="flex flex-col gap-1 w-full">
                                <label className='text-xs font-medium leading-5 text-gray-700'>Name</label>
                                <input
                                    type='text'
                                    placeholder='eg. Chijioke'
                                    className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
                                <input
                                    type='text'
                                    placeholder='eg. Chijioke@gamil.com'
                                    className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
                                <input
                                    type='text'
                                    placeholder='eg. 0123456789'
                                    className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                />
                            </div>

                            <div className='grid grid-cols-3 w-full justify-between text-sm gap-1'>

                                <span className='text-sm font-semibold leading-6 '>Rooms</span>
                                <span className='text-sm font-semibold leading-6 '>Days</span>
                                <span className='text-sm font-semibold leading-6 '>Room price</span>

                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label className='text-xs font-medium leading-5 text-gray-700'>Paying Amount</label>
                                <input
                                    type='text'
                                    placeholder='eg. N21,000'
                                    className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                />
                            </div>

                            <div className="w-full mt-3">
                                <button
                                    type="button"
                                    className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 uppercase hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                                >
                                    Book now
                                </button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default BookRoom;