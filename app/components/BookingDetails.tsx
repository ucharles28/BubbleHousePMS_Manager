import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { useState } from 'react';

export default function BookingDetails({ booking }: { booking: any }) {
    const bookingStatus = [
        {
            label: 'Check In',
            value: 1
        },
        {
            label: 'Check Out',
            value: 2
        }
    ]

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    function getRoomTypesText(roomTypes: any[]) {
        let roomTypesText = ''

        roomTypes.forEach((roomType, index) => {
            roomTypesText += `${roomType.numberBookedRooms} ${roomType?.roomType?.name}`
            if (roomTypes.length - 1 !== index) {
                roomTypesText += ', '
            }
        })

        return roomTypesText
    }

    function getTotalBookedRooms(roomTypes: any[]) {
        let totalBookedRooms = 0

        roomTypes.forEach((roomType) => {
            totalBookedRooms += Number(roomType?.numberBookedRooms)
        })

        return totalBookedRooms
    }

    return (
        <div className='flex flex-col gap-y-11 w-full'>
            <div className='grid grid-cols-2 md:grid-cols-4 w-full justify-between gap-6 md:gap-8 bg-white border border-[#E4E4E4] p-4 py-5 rounded-lg'>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Booking Number</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking?.code}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Room Type</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{getRoomTypesText(booking?.roomTypes)}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>No of Rooms</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{getTotalBookedRooms(booking?.roomTypes)}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Check-In</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{format(new Date(booking.checkInDate), 'dd-MM-yyyy')}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Child</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking.totalChildren}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Adults</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking.totalAdults}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Check-Out</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{format(new Date(booking.checkOutDate), 'dd-MM-yyyy')}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Guest Name</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking.fullName}</p>
                </div>

                <div className='flex flex-col gap-2 md:col-span-1 col-span-2'>
                    <p className='text-sm font-normal text-[#636363]'>Guest Email</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking.email}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Guest Phone</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>{booking.phone}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Payment Method</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        {booking.isReservation ? "Premises" : "Online"}
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Total</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        NGN {Number(booking.totalAmount).toLocaleString()}
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Total Paid</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        {Number(booking.totalAmountPaid) > 0 ? `NGN ${Number(booking.totalAmount).toLocaleString()}` : 'None'}
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Payment Status</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        {Number(booking.totalAmountPaid) > 0 ? 'Paid' : 'Not Paid'}
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Identification Type</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        {booking?.identificationType}
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-normal text-[#636363]'>Estimated Arrival Time</p>
                    <p className='text-sm font-medium text-[#1A1A1A]'>
                        {booking?.estimatedArrivalTime}
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
                        {booking.specialRequest}
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
                            {bookingStatus.map((stat) => <option className='placeholder:text-xs text-sm' value={stat.value}>{stat.label}</option>)}
                        </select>
                    </div>

                </div>

                <div className='w-full bg-yellow-200'>Hello</div>
            </div>
        </div>
    )
}