'use client'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { OptionType } from '../models/optionType';
import { CircularProgress, Menu } from '@mui/material';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import { ArrowLeft2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import UpgradeRoom from './UpgradeRoom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AmendStay from './AmendStay';
import AddExtraRoomToBooking from './AddExtraRoomToBooking';
import ApplyDiscount from './ApplyDiscount';
import AddPayment from './AddPayment';

type Room = {
    roomNumber: string
    price: number
}

type BookedRoom = {
    roomId: string
}


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


export default function BookingDetails({ booking, availableRooms = [], hotelId }: { booking: any, availableRooms: any[], hotelId: string }) {
    const router = useRouter()

    const [selectedRooms, setSelectedRooms] = useState<MultiValue<OptionType> | null>([])
    const [selectedRooms2, setSelectedRooms2] = useState<Record<number, MultiValue<OptionType>>>(booking.roomTypes.reduce((acc: any, current: any, index: number) => {
        acc[index] = [];
        return acc;
    }, {}))
    // const [roomOptions, setRoomOptions] = useState<Record<number, OptionType[]>>(booking.roomTypes.map((_roomType: any, index: number) => ({ [index]: [] })))
    const [roomOptions, setRoomOptions] = useState<Record<number, OptionType[]>>(booking.roomTypes.reduce((acc: any, current: any, index: number) => {
        acc[index] = [];
        return acc;
    }, {}))
    const [roomsDropdown, setRoomsDropdown] = useState<Record<number, boolean>>(booking.roomTypes.reduce((acc:any, current:any, index:number) => {
        acc[index] = false;
        return acc;
    }, {}))
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
    const [openDialog, setOpenDialog] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [menuIndex, setMenuIndex] = useState(0);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const daysDiff = dateDiffInDays(new Date(booking.checkInDate), new Date(booking.checkOutDate))
    const bookingType: Record<number, string> = {
        1: 'Individual',
        2: 'Corporate',
        3: 'Group'
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const roomsOptions: OptionType[] = availableRooms.map((room) => (
        {
            value: String(room.id),
            label: String(room.roomNumber)
        }
    ))

    const goBack = () => {
        router.back()
    }

    function dateDiffInDays(a: Date, b: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }


    function handleRoomSelect (selected: MultiValue<OptionType>, index: number) {
        if (selected.length > Number(booking.roomTypes[index].numberOfRoomsBooked)) {
            return;
        }

        setSelectedRooms2((prevState) => ({...prevState, [index]: selected}))
    }

    useEffect(() => {
        if (selectedRooms && selectedRooms.length > 0 && booking.isComplementary) {
            const rooms = selectedRooms.map((selectedRoom) => {
                const room = availableRooms.find(item => String(item.id) === selectedRoom.value)
                return {
                    roomNumber: room.roomNumber,
                    price: Number(room.price)
                }
            })

            let totalRoomsPrice = rooms.map(item => item.price).reduce((prev, next) => prev + next) * daysDiff;

            const theVat = 0.075 * totalRoomsPrice
            const theStateTax = 0.05 * totalRoomsPrice
            setTotalAmount(theVat + theStateTax + totalRoomsPrice)
            setVat(theVat)
            setStateTax(theStateTax)
            setSubTotal(totalRoomsPrice)
            setRoomsToBook(rooms)
        } else {
            setTotalAmount(0)
            setVat(0)
            setStateTax(0)
            setSubTotal(0)          
        }
    }, [selectedRooms])

    useEffect(() => {
        if (booking) {
            setBookingStatus(booking.status)
            // if (bookingStatusOptions.some(item => item.value === String(booking.status))) {
            //     setSelectedBookingStatus(bookingStatusOptions.find(item => item.value === String(booking.status)))
            // }

            // if (booking.bookedRooms) {
            //     const bookedRooms: BookedRoom[] = booking.bookedRooms as BookedRoom[]

            //     const selected = roomsOptions.filter(room => (bookedRooms.some(item => String(item.roomId) === room.value)))
            //     setSelectedRooms(selected as MultiValue<OptionType>)
            // }
            setTotalAmount(booking.totalAmount - booking.totalAmountPaid)
        }
    }, [booking])

    async function handleCheckIn() {
        const response = await makeApiCall(`Booking/Hotel/Checkin/${booking.id}`, 'GET')
        if (response.successful) {
            message.success('Check in successful')
            refreshPage()
        } else {
            message.error(response.data)
        }
    }

    async function handleCheckOut() {
        const response = await makeApiCall(`Booking/Hotel/Checkout/${booking.id}`, 'GET')
        if (response.successful) {
            message.success('Check out successful')
            refreshPage()
        } else {
            message.error(response.data)
        }
    }

    async function fetchRoomsByRoomType(roomTypeId: string, index: number) {
            const request = {
                roomTypeId,
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
            }
            const response = await makeApiCall(`Room/RoomType/GetAvailableRooms`, 'POST', request);
            if (response.successful) {
                setRoomOptions((prevState) => {
                    const newState = { ...prevState }
                    newState[index] = response.data.map((room: any) => ({
                        label: room.roomNumber,
                        value: room.id,
                    }))
                    return newState
                })
            }
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const refreshPage = () => {
        router.refresh()
    }


    const handleCloseDrawer = (refresh: boolean = false) => {
        setOpenDrawer(false);
        if (refresh) {
            refreshPage()
        }
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

    async function savePaymentInfo(paymentInfo: any) {
        paymentInfo['bookingId'] = booking.id;

        const response = await makeApiCall('Booking/Hotel/Payment', 'POST', paymentInfo)
        if (response.successful) {
            message.success('Payment added successfully')
            handleCloseDrawer()
            refreshPage()
        } else {
            message.error(response.data)
        }
    }

    function getRoomTypesText(roomTypes: any[]) {
        const roomTypeNames = roomTypes.map((roomType) => (`${roomType.numberOfRoomsBooked} ${roomType?.roomType?.name}`))
        return roomTypeNames.join(',')
    }

    async function assignRoom(index: number) {
        if (selectedRooms2[index].length < (booking.roomTypes[index].numberOfRoomsBooked)) {
            message.error('The rooms selected is less than the number of rooms booked')
            return
        }

        const req = {
            bookingId: booking.id,
            roomIds: selectedRooms2[index].map((room) => room.value)
        }
        const response = await makeApiCall('Booking/Hotel/Assign', "POST", req)

        if (response.successful) {
            message.success('Room assigned successfully')
            handleShowRoomsDropdown(index, booking.roomTypes[index])
            refreshPage()
        } else {
            message.error(response.data)
        }
    }

    function getTotalBookedRooms(roomTypes: any[]) {
        let totalBookedRooms = 0

        roomTypes.forEach((roomType) => {
            totalBookedRooms += Number(roomType?.numberOfRoomsBooked)
        })

        return totalBookedRooms
    }

    function handleMenuClick(index: number) {
        setMenuIndex(index)
        setOpenDrawer(true)
        handleCloseMenu();
    }

    function handleShowRoomsDropdown(index: number, roomType: any) {
        setRoomsDropdown((prevState) => ({...prevState, [index]: !roomsDropdown[index]}))
        if (!roomsDropdown[index] && roomOptions[index].length < 1) {
            fetchRoomsByRoomType(roomType.roomTypeId, index)
        }
    }

    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-y-1 w-full'>
                <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Booking details of {booking?.code}
                </p>

                <div className='flex justify-end items-center gap-2 w-full'>

                    <button
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </button>

                    {/* <button
                        type="button"
                        className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        onClick={handleClickOpen}
                    >
                        Add New
                    </button> */}

                    <>
                        <Button
                            id="fade-button"
                            // xs={{ background: '#1a1a1a', color: '#ffff' }}
                            className='bg-[#1a1a1a]/50 hover:bg-[#636363] text-white text-xs font-medium flex items-center px-2 py-2'
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            More Options
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            TransitionComponent={Fade}
                        >
                            {booking.status === 1 ?
                            <MenuItem onClick={() => handleCheckOut()}>Check Out</MenuItem> 
                            : <MenuItem onClick={() => handleCheckIn()}>Check In</MenuItem>}
                            <MenuItem onClick={() => handleMenuClick(0)}>Add Payment</MenuItem>
                            <MenuItem onClick={() => handleMenuClick(1)}>Upgrade Room</MenuItem>
                            <MenuItem onClick={() => handleMenuClick(2)}>Extend Stay</MenuItem>
                            <MenuItem onClick={() => handleMenuClick(3)}>Add Room</MenuItem>
                            <MenuItem onClick={() => handleMenuClick(4)}>Apply Discount</MenuItem>
                        </Menu>
                    </>

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
                        <p className='text-sm font-normal text-[#636363]'>Booking Type</p>
                        <p className='text-sm font-medium text-[#1A1A1A]'>{bookingType[Number(booking.bookingType)]}</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-normal text-[#636363]'>Check-In</p>
                        <p className='text-sm font-medium text-[#1A1A1A]'>{format(new Date(booking.checkInDate), 'dd-MM-yyyy')}</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-normal text-[#636363]'>Check-Out</p>
                        <p className='text-sm font-medium text-[#1A1A1A]'>{format(new Date(booking.checkOutDate), 'dd-MM-yyyy')}</p>
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
                            {booking.paymentMethod}
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
                            {Number(booking.totalAmountPaid) > 0 ? `NGN ${Number(booking.totalAmountPaid).toLocaleString()}` : 'None'}
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
                            {booking.bookedRooms ? booking.bookedRooms.map((bookedRoom: any) => bookedRoom.room.roomNumber).join(', ') : 'None'}
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

                {/* Dialog */}
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

                {/* Drawer */}
                <Drawer
                    anchor={'right'}
                    open={openDrawer}
                    onClose={() => handleCloseDrawer()}
                >
                    <div className="flex w-full md:w-[350px] lg:w-[550px] h-full">
                        {menuIndex == 0 && <AddPayment savePaymentInfo={savePaymentInfo} onClose={handleCloseDrawer} showSurchargeFee={true} />}
                        {menuIndex == 1 && <UpgradeRoom bookedRoomTypes={booking?.roomTypes} bookedRooms={roomsOptions} hotelId={hotelId} booking={booking} onClose={handleCloseDrawer} />}
                        {menuIndex == 2 && <AmendStay booking={booking} onClose={handleCloseDrawer} />}
                        {menuIndex == 3 && <AddExtraRoomToBooking hotelId={hotelId} booking={booking} onClose={handleCloseDrawer} />}
                        {menuIndex == 4 && <ApplyDiscount hotelId={hotelId} booking={booking} onClose={handleCloseDrawer} />}
                    </div>
                </Drawer>

                <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>

                    <div className='flex flex-col gap-5 w-full'>
                        <div className="flex flex-col gap-4">
                            {booking.roomTypes.map((roomType: any, index: number) => (<div className="flex-col w-2/3 border border-[#1a1a1a]/35 shadow p-4">
                                <div className="grid grid-cols-3">
                                    <p className="text-xs text-[#636363] mb-2">Room Type</p>
                                    <p className="text-xs text-[#636363] font-medium">Room(s)</p>
                                    <p className="text-xs text-[#636363] font-medium">Number of Rooms</p>
                                    <p className="text-base">{roomType.roomType.name}</p>
                                    {booking.bookedRooms.some((room: any, index: number) => room.room.roomTypeId == roomType.roomTypeId) 
                                    ? <p className="text-base">{booking.bookedRooms
                                        .filter((room: any) => room.room.roomTypeId == roomType.roomTypeId)
                                        .map((room: any) => room.room.roomNumber)
                                        .join(', ')}</p>
                                    : 
                                    <div className="flex justify-start text-xs">
                                    <button onClick={() => handleShowRoomsDropdown(index, roomType)} className='border-[#F5C400] rounded text-[#F5C400] py-1 px-2 border'>Assign Room</button>
                                    </div>}                                
                                    <p className="text-base">{roomType.numberOfRoomsBooked}</p>
                                </div>
                                {roomsDropdown[index] ? <div className="flex flex-col transform transition duration-[1000ms]">
                                    <div className="flex flex-col space-y-1 mt-3" >
                                            <label className="text-xs text-[#636363]">Room(s)</label>
                                            <Select
                                                isMulti
                                                options={roomOptions[index]}    
                                                value={selectedRooms2[index]}                                        // value={selectedRooms}
                                                onChange={(e) => handleRoomSelect(e, index)}
                                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                                classNamePrefix="select"
                                            />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-3">
                                        <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#1a1a1a]/70" onClick={() => handleShowRoomsDropdown(index, roomType)}>
                                            Cancel
                                        </button>
                                        <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#F5C400]/70 disabled:bg-[#F5C400]/70" disabled={selectedRooms2[index].length < 1} onClick={() => assignRoom(index)}>
                                            Assign Room
                                        </button>
                                    </div>
                                </div> : null}

                            </div>))}
                        </div>

                        {/* <div className="flex flex-col space-y-1" >
                            <label className='text-xs font-medium leading-5 text-gray-700'>Booking Status</label>
                            <Select
                                options={bookingStatusOptions}
                                value={selectedBookingStatus}
                                onChange={(e) => setSelectedBookingStatus(e)}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                // placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div> */}
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='w-full bg-white border border-[#E4E4E4] rounded-md flex flex-col p-4'>
                            <p className='text-base font-normal'>Billing Details</p>
                            <div className='flex flex-col w-full p-[10px] gap-[6px]'>
                                <div className='grid grid-cols-3 w-full text-[#383838]'>
                                    <p className='text-sm font-medium'>Room Types</p>
                                    <p className='text-sm font-medium text-center'>No. of Rooms</p>
                                    <p className='text-sm font-medium text-right'>Room price</p>
                                </div>
                                {booking.roomTypes.map((roomType: any) => (<div className='grid grid-cols-3 w-full text-[#636363]'>
                                    <p className='text-sm font-normal'>{roomType.roomType.name}</p>
                                    <p className='text-sm font-normal text-center'>{roomType.numberOfRoomsBooked}</p>
                                    <p className='text-sm font-normal text-right'>NGN {(roomType.roomPrice * daysDiff).toLocaleString()}</p>
                                </div>))}
                                <div className='grid w-full grid-cols-2 pb-1 border-b border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>Sub Total</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {booking.totalRoomPrice.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between border-b pb-1 border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>7.5 % VAT</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {booking.vatAmount.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between border-b pb-1 border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>5 % State Tax</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>NGN {booking.stateTaxAmount.toLocaleString()}</p>
                                </div>
                                <div className='flex w-full justify-between border-b pb-1 border-b-[#E4E4E4]'>
                                    <p className='text-sm font-normal text-[#636363]'>Payment</p>
                                    <p className='text-sm font-normal text-right text-[#383838]'>- NGN {booking.totalAmountPaid.toLocaleString()}</p>
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

                            {/* {(bookingStatus !== 0 && bookingStatus !== 3) && <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#F5C400] text-xs leading-6 uppercase hover:bg-[#F5C400]/70" onClick={updateBooking}>
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                            </button>} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}