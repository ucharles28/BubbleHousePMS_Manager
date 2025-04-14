'use client'
import { CircularProgress } from '@mui/material';
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';

const ApplyDiscount = ({booking, hotelId, onClose}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDiscountRate, setSelectedDiscountRate] = useState();
    const [selectedDiscountType, setSelectedDiscountType] = useState();
    const [discountDays, setDiscountDays] = useState('');
    const [discountDaysIsVisible, setDiscountDaysIsVisible] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const discountTypeOptions = [
        { value: 0, label: 'Percentage' },
        { value: 1, label: 'Flat Discount' },
    ];

    const discountRateOptions = [
        {value: 0, label: 'First Night'},
        {value: 1, label: 'Last Night'},
        {value: 2, label: 'All Nights'},
        {value: 3, label: 'Selected Nights'}
    ]

    useEffect(() => {
        if (selectedDiscountRate) {
            if (selectedDiscountRate.value === 3) {
                setDiscountDaysIsVisible(true)
            } else {
                setDiscountDaysIsVisible(false)
            }
        }
    }, [selectedDiscountRate])

    async function applyDiscount() {
        setIsLoading(true)
        const request = {
            bookingId: booking.id,
            type: selectedDiscountType.value,
            value: discountAmount,
            application: selectedDiscountRate.value,
            selectedNights: discountDays.split(',').filter((day) => {
                day = day.trim()
                if (!isNaN(day)) {
                    return Number(day)
                }
            })
        }
        
        const response = await makeApiCall('Booking/Hotel/ApplyDiscount', 'POST', request)

        if (response.successful) {
            message.success('Discount applied successfully')
            onClose(true)
        } else {
            message.error(response.data)
        }
           
        setIsLoading(false)
    }
    return (
        <div className='flex flex-col p-4 h-screen gap-4 p-4 w-full'>
            <div className="flex flex-col gap-8">
                <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Apply Discount
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">

                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Discount Type:</p>
                            <Select
                                options={discountTypeOptions}
                                value={selectedDiscountType}
                                onChange={(e) => setSelectedDiscountType(e)}
                                className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                // placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Discount:</p>
                            <input
                                type='number'
                                placeholder=''
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                className='bg-white w-full col-span-2 border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal py-2 px-4 focus:outline-0 bg-transparent rounded-md'
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Discount Rate:</p>
                            <Select
                                options={discountRateOptions}
                                value={selectedDiscountRate}
                                onChange={(e) => setSelectedDiscountRate(e)}
                                className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                // placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div>
                        {discountDaysIsVisible && <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Discounted Days (Comma seperated):</p>
                            <input
                                type='text'
                                placeholder=''
                                value={discountDays}
                                onChange={(e) => setDiscountDays(e.target.value)}
                                className='bg-white w-full col-span-2 border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal py-2 px-4 focus:outline-0 bg-transparent rounded-md'
                            />
                        </div>}
                        
                        {/* <div className="grid grid-cols-3 items-center">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Discount Rate:</p>
                            <Select
                                options={discountRateOptions}
                                // value={selectedValues[index].room}
                                // onChange={(e) => handleRoomSelect(e, index)}
                                className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                classNamePrefix="select"
                            />
                        </div> */}
                    </div>
                    
                </div>
            </div>
            <div className="flex h-full w-full items-end">
                <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                    <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                    <button onClick={applyDiscount} disabled={!selectedDiscountRate || !selectedDiscountType || !discountAmount || discountAmount < 1  } className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplyDiscount
