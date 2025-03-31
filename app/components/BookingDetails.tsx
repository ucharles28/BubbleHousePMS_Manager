'use client'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { OptionType } from '../models/optionType';
import { CircularProgress } from '@mui/material';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import { ArrowLeft2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';

type Room = {
    roomNumber: string
    price: number
}

type BookedRoom = {
    roomId: string
}



export default function BookingDetails({ booking, availableRooms = [] }: { booking: any, availableRooms: any[] }) {
    const router = useRouter()

    const [selectedRooms, setSelectedRooms] = useState<MultiValue<OptionType> | null>([])
    const [roomsToBook, setRoomsToBook] = useState<Room[]>([])
    const [isApproving, setIsApproving] = useState(false)
    const [isCancelling, setIsCancelling] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [vat, setVat] = useState(0)
    const [bookingStatus, setBookingStatus] = useState(0)
    const [stateTax, setStateTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [selectedBookingStatus, setSelectedBookingStatus] = useState<SingleValue<OptionType> | null>()

    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        if (selectedRooms && selectedRooms.length > 0) {
            const rooms = selectedRooms.map((selectedRoom) => {
                const room = availableRooms.find(item => String(item.id) === selectedRoom.value)
                return {
                    roomNumber: room.roomNumber,
                    price: Number(room.roomType.price)
                }
            })

            let totalRoomsPrice = rooms.map(item => item.price).reduce((prev, next) => prev + next);

            const theVat = 0.075 * totalRoomsPrice
            const theStateTax = 0.05 * totalRoomsPrice
            setTotalAmount(theVat + theStateTax + totalRoomsPrice)
            setVat(theVat)
            setStateTax(theStateTax)
            setSubTotal(totalRoomsPrice)
            setRoomsToBook(rooms)
        }
    }, [selectedRooms])

    useEffect(() => {
        if (booking) {
            setBookingStatus(booking.status)
            if (bookingStatusOptions.some(item => item.value === String(booking.status))) {
                setSelectedBookingStatus(bookingStatusOptions.find(item => item.value === String(booking.status)))
            }

            if (booking.bookedRooms) {
                const bookedRooms: BookedRoom[] = booking.bookedRooms as BookedRoom[]

                const selected = roomsOptions.map(room => {
                    if (bookedRooms.some(item => String(item.roomId) === room.value)) {
                        return room
                    }
                })
                setSelectedRooms(selected as MultiValue<OptionType>)
            }
        }
    }, [booking])

    const roomsOptions: OptionType[] = availableRooms.map((room) => (
        {
            value: String(room.id),
            label: String(room.roomNumber)
        }
    ))

    const bookingStatusOptions: OptionType[] = [
        {
            label: 'Check In',
            value: '1'
        },
        {
            label: 'Check Out',
            value: '2'
        }
    ]

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    async function confirmBooking() {
        setIsApproving(true)
        const response = await makeApiCall('Booking/Hotel/Confirm', 'POST', booking.id)

        if (response.successful) {
            message.success('Booking confirmed successfully')
            setBookingStatus(4)
        } else {
            message.error(response.data)
        }
        setIsApproving(false)
    }

    async function cancelBooking() {
        setIsCancelling(true)
        const response = await makeApiCall('Booking/Hotel/Cancel', 'POST', booking.id)

        if (response.successful) {
            message.success('Booking cancelled successfully')
            setBookingStatus(3)
        } else {
            message.error(response.data)
        }
        setIsCancelling(false)
    }

    async function updateBooking() {
        setIsLoading(true)
        const req = {
            bookedRooms: selectedRooms?.map((room) => {
                return availableRooms.find(item => String(item.id) === room.value)
            }),
            status: selectedBookingStatus ? Number(selectedBookingStatus.value) : Number(booking.status),
        }

        const response = await makeApiCall(`Booking/${booking.id}`, 'PUT', req)


        if (response.successful) {
            message.success('Booking updated successfully')
        } else {
            message.error(response.data)
        }
        setIsLoading(false)
    }

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
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-y-1 w-full'>
                <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Booking details of {booking?.code}
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
                        <p className='text-sm font-normal text-[#636363]'>Room Number(s)</p>
                        <p
                            className='text-sm font-medium text-[#1A1A1A]'
                            onClick={handleClickOpen}
                        >
                            {booking.bookedRooms ? booking.bookedRooms.map((bookedRoom : any) => bookedRoom.room.roomNumber).join(', ') : 'None'} 
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

                <Dialog 
                open={openDialog} 
                onClose={handleClose}
                maxWidth={'sm'}
                fullWidth={true}
                >
                    <DialogTitle
                        className='font-poppins'
                        sx={{
                            padding: "16px",
                            fontSize: "1rem",
                            letterSpacing: "0rem",
                            fontWeight: "600",
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
                        className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full w-full'
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
                            <Select
                                isMulti
                                options={roomsOptions}
                                value={selectedRooms}
                                onChange={(e) => setSelectedRooms(e)}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                // placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div>

                        <div className="flex flex-col space-y-1" >
                            <label className='text-xs font-medium leading-5 text-gray-700'>Booking Status</label>
                            <Select
                                options={bookingStatusOptions}
                                value={selectedBookingStatus}
                                onChange={(e) => setSelectedBookingStatus(e)}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                // placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div>

                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='w-full bg-white border border-[#E4E4E4] rounded-md flex flex-col p-4'>
                            <p className='text-base font-normal'>Billing Details</p>
                            <div className='flex flex-col w-full p-[10px] gap-[6px]'>
                                <div className='flex w-full justify-between text-[#383838]'>
                                    <p className='text-sm font-medium'>Room</p>
                                    <p className='text-sm font-medium'>Room price</p>
                                </div>
                                {roomsToBook.map((room) => (<div className='flex w-full justify-between text-[#636363]'>
                                    <p className='text-sm font-normal'>{room.roomNumber}</p>
                                    <p className='text-sm font-normal text-right'>NGN {room.price.toLocaleString()}</p>
                                </div>))}
                                <div className='flex w-full justify-between pb-1 border-b border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>Sub Total</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {subTotal.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between border-b pb-1 border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>7.5 % VAT</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {vat.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between border-b pb-1 border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>5 % State Tax</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {stateTax.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between'>
                                    <p className='text-sm font-medium text-[#383838]'>Total</p>
                                    <p className='text-sm font-medium text-right text-[#383838]'>NGN {totalAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            {/* <input
                            type="number"
                            placeholder="Paying amount"
                            // value={numberOfRooms}
                            // onChange={(e) => setNumberOfRooms(e.target.value)}
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        /> */}
                        </div>
                        <div className='flex justify-end gap-3'>
                            {bookingStatus === 0 && <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]" onClick={cancelBooking}>
                                {isCancelling ? <CircularProgress size={20} color="inherit" /> : 'Cancel'}
                            </button>}
                            {bookingStatus === 0 && <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#F5C400]/70" onClick={confirmBooking}>
                                {isApproving ? <CircularProgress size={20} color="inherit" /> : 'Approve'}
                            </button>}

                            {(bookingStatus !== 0 && bookingStatus !== 3) && <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#F5C400]/70" onClick={updateBooking}>
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}