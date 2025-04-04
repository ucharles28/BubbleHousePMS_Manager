'use client'
import React from 'react'
import { DatePicker, DatePickerProps, message } from 'antd';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import { makeApiCall } from '../helpers/apiRequest';

const AmendStay = ({ booking, onClose }: { booking: any, onClose: (refresh: boolean) => void }) => {
    const [checkInDate, setCheckDate] = React.useState(new Date(booking.checkInDate));
    const minDate = new Date(booking.checkInDate).setDate(new Date(booking.checkInDate).getDate() + 1);
    const [checkOutDate, setCheckOutDate] = React.useState(new Date(booking.checkOutDate));
    const [isLoading, setIsLoading] = React.useState(false);
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setCheckOutDate(new Date(String(dateString)));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = checkInDate;
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + Number(e.target.value))
        setCheckOutDate(endDate)
    }

    const amendStay = async () => {
        setIsLoading(true)
        const response = await makeApiCall(`Booking/Hotel/AmendStay/${booking.id}`, 'PUT', checkOutDate)
        if (response.successful) {
            message.success('Stay amended successfully')
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
                    Amend Stay
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Arrival:</p>
                            <DatePicker
                                className='col-span-2'
                                getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode as HTMLElement;
                                }}
                                format={{
                                    format: 'YYYY-MM-DD',
                                    type: 'mask',
                                }}
                                defaultValue={dayjs(booking.checkInDate)}
                                disabled
                                onChange={onChange} />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className='text-sm font-normal text-[#1A1A1A]'>Departure:</p>
                            <DatePicker
                                className='col-span-2'
                                format={{
                                    format: 'YYYY-MM-DD',
                                    type: 'mask',
                                }}
                                getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode as HTMLElement;
                                }}
                                minDate={dayjs(minDate)}
                                value={dayjs(checkOutDate)}
                                onChange={onChange} />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4 w-full items-center'>
                        <label className='text-sm font-font-normal text-[#1A1A1A]'>Nights: </label>
                        <input
                            type="number"
                            // value={totalAmount}
                            onChange={handleTextChange}
                            role="input"
                            className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                        />
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full items-end">
                <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                    <button onClick={() => onClose(false)} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                    <button onClick={amendStay} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AmendStay
