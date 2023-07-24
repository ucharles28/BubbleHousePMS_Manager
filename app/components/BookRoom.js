'use client'
import { ArrowLeft2, Calendar } from "iconsax-react"
import { useRouter } from "next/navigation"
import Button from "./RoomSelector"
import { useEffect, useState } from "react"
import Select, { SingleValue } from 'react-select';
import { OptionType } from "../models/optionType"
import { format } from "date-fns"
import ReactCalendar from "react-calendar";
import { makeApiCall } from "../helpers/apiRequest"
import { CircularProgress } from "@mui/material"
import { message } from "antd"


export default function BookRoom({ roomTypes, hotelId }) {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [openDate, setOpenDate] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [searchRoomIsLoading, setSearchRoomIsLoading] = useState(false);
    const [stateTax, setStateTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [vat, setVat] = useState(0)
    const [payingAmount, setPayingAmount] = useState(0)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfDays, setNumberOfDays] = useState(0);

    const datePickerHandler = () => {
        setOpenDate(!openDate);
    };

    useEffect(() => {
        if (selectedRooms.length > 0) {
            const days = dateDiffInDays(dateFrom, dateTo)
            let totalRoomsPrice = selectedRooms.map(item => item.roomType.price).reduce((prev, next) => prev + next);
            totalRoomsPrice *= days
            const theVat = 0.075 * totalRoomsPrice
            const theStateTax = 0.05 * totalRoomsPrice
            setTotalAmount(theVat + theStateTax + totalRoomsPrice)
            setVat(theVat)
            setStateTax(theStateTax)
            setSubTotal(totalRoomsPrice)

            setNumberOfDays(days)
        } else {
            setTotalAmount(0)
            setVat(0)
            setStateTax(0)
            setSubTotal(0)
        }
    }, [selectedRooms])

    const roomTypesOption = roomTypes.map((roomType) => (
        { value: roomType.id, label: roomType.name }
    ))

    const [selectedRoomType, setSelectedRoomType] = useState();

    const handleRoomTypeSelectChange = (selectedOption) => {
        setSelectedRoomType(selectedOption);
    };

    function handleSelectRoom(index) {
        let list = [...rooms]
        const room = list[index]
        if (room.status === 2) {//if already selected
            handleRemoveRoom(room)
        } else {
            list.forEach((item) => {
                if (item.id === room.id) {
                    item.status = 2
                }
            })
            setRooms(list)
            list = [...selectedRooms]
            list.push(room)
            setSelectedRooms(list)
        }
    }

    async function handleBookRoom() {
        setIsLoading(true)
        let request = {
            checkInDate: dateFrom,
            checkOutDate: dateTo,
            email,
            fullName,
            vATAmount: vat,
            hotelId,
            isMainGuest: true,
            isReservation: true,
            phone,
            StateTaxAmount: stateTax,
            totalAmount,
            totalRoomPrice: subTotal,
            bookedRoomIds: selectedRooms.map((room) => room.id),
            totalAmountPaid: Number(payingAmount),
            totalAdults: 1
        }
        const groupedRooms = groupBy(selectedRooms, "roomTypeId");
        const bookedRoomTypeList = Object.keys(groupedRooms).map((key) => {
            const roomType = groupedRooms[key][0].roomType
            return {
                numberBookedRooms: groupedRooms[key].length,
                roomPrice: roomType.price,
                roomTypeId: roomType.id
            }
        })

        request.roomTypes = bookedRoomTypeList

        const response = await makeApiCall('Booking/Hotel/Create', 'POST', request)

        if (response.successful) {
            message.success('Booking created successfully')
            setSelectedRoomType([])
            setSelectedRooms([])
        } else {
            message.error(response.data)
        }

        setIsLoading(false)
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const groupBy = (arr, key) => {
        const initialValue = {};
        return arr.reduce((acc, cval) => {
            const myAttribute = cval[key];
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc;
        }, initialValue);
    };

    function handleRemoveRoom(room) {
        let list = [...selectedRooms]
        const index = list.indexOf(room)
        list.splice(index, 1)
        setSelectedRooms(list)

        list = [...rooms]
        if (list.some(item => item.id === room.id)) {
            list.forEach((item) => {
                if (item.id === room.id) {
                    item.status = 0
                }
            })
            setRooms(list)
        }
    }

    const getRooms = async () => {
        setSearchRoomIsLoading(true)
        const request = {
            checkInDate: dateFrom,
            checkOutDate: dateTo,
            roomTypeId: selectedRoomType.value,
            numberOfRooms,
            hotelId
        }

        const response = await makeApiCall('Room/Hotel/GetAvailableRooms', 'POST', request)
        if (response.successful) {
            setRooms(response.data.map((room) => {
                if (selectedRooms.some(item => item.id === room.id)) {
                    room.status = 2
                }
                return room
            }))
        } else {
            message.error(response.data)
        }
        setSearchRoomIsLoading(false)
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
                        <Select
                            options={roomTypesOption}
                            value={selectedRoomType}
                            onChange={handleRoomTypeSelectChange}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder='Select room type'
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="relative flex flex-col gap-1 w-full md:col-span-1">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Check In/Out</label>
                        <div
                            className="bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md flex items-center gap-2 cursor-pointer"
                            onClick={datePickerHandler}
                        >
                            {`${format(dateFrom, "dd-MM-yyy")} - ${format(
                                dateTo,
                                "dd-MM-yyy"
                            )}`}
                        </div>

                        {openDate && (
                            <div className="absolute mt-16 left-0">
                                <ReactCalendar
                                    selectRange
                                    prev2Label={null}
                                    next2Label={null}
                                    minDetail="month"
                                    value={[dateFrom, dateTo]}
                                    onChange={(res) => {
                                        setDateFrom(res[0])
                                        setDateTo(res[1])
                                    }}
                                    tileDisabled={(day) => {
                                        return day.date.getDay() === 0;
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 w-full md:col-span-1">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Room</label>
                        <input
                            type='number'
                            placeholder='eg. 2'
                            value={numberOfRooms}
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                        />
                    </div>

                    <div className="md:col-span-3 w-full mt-3">
                        <button
                            type="button"
                            disabled={!selectedRoomType || (dateFrom > dateTo) || (numberOfRooms < 1)}
                            onClick={getRooms}
                            className="w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 capitalize hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                        >
                            {searchRoomIsLoading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
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
                                    {`${format(dateFrom, "dd-MM-yyy")} to ${format(
                                        dateTo,
                                        "dd-MM-yyy"
                                    )}`}
                                </p>

                                <div className='col-span-2 p-2 flex flex-wrap justify-start gap-3 w-full h-auto'>
                                    {rooms.map((room, index) => (<Button onClick={() => handleSelectRoom(index)} key={index} variant={room.status} disabled={Number(room.status) === 1}>{room.roomNumber}</Button>))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
                        <p className='mb-[0] text-sm text-[#636363] font-medium leading-6 w-full'>Booking Information</p>

                        <div className='grid grid-cols-1 w-full gap-6'>

                            <div className='flex flex-col gap-3 w-full'>

                                <div className="flex flex-col gap-1 w-full">
                                    <label className='text-xs font-medium leading-5 text-gray-700'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='eg. Chijioke'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
                                    <input
                                        type='email'
                                        placeholder='eg. Chijioke@gamil.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
                                    <input
                                        type='text'
                                        placeholder='eg. 0123456789'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                    />
                                </div>

                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className='grid grid-cols-3 w-full justify-between gap-1'>
                                    <span className='text-xs font-semibold leading-6 flex justify-start'>Rooms</span>
                                    <span className='text-xs font-semibold leading-6 flex justify-center'>Days</span>
                                    <span className='text-xs font-semibold leading-6 flex justify-end'>Room price</span>
                                </div>

                                {selectedRooms.map((selectedRoom, index) => (<div key={index} className='grid grid-cols-3 w-full items-center justify-between text-[#636363] text-xs gap-1'>
                                    <div className="flex gap-1.5 items-center w-full justify-start">
                                        <span
                                            className="px-2.5 py-1 rounded-lg bg-[#FF6166] text-xs font-medium text-white cursor-pointer"
                                            onClick={() => handleRemoveRoom(selectedRoom)}
                                        >
                                            x
                                        </span>
                                        <span className='font-normal leading-6'>{selectedRoom.roomNumber}</span>
                                    </div>
                                    <span className='font-normal leading-6 w-full flex justify-center'>
                                        {numberOfDays}
                                    </span>
                                    <span className='font-normal leading-6 w-full flex justify-end'>
                                        NGN {Number(selectedRoom.roomType.price).toLocaleString()}
                                    </span>
                                </div>))}
                            </div>

                            <div className="flex flex-col gap-3 w-full mt-2">

                                <div className="flex items-center justify-between w-full text-xs font-normal text-[#636363]">
                                    <span className=''>Sub Total</span>
                                    <span className='font-medium text-gray-950'>NGN {subTotal.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between w-full text-xs font-normal text-[#636363]">
                                    <span className=''>7.5 % VAT</span>
                                    <span className='font-medium text-gray-950'>NGN {vat.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between w-full text-xs font-normal text-[#636363]">
                                    <span className=''>5 % State Tax</span>
                                    <span className='font-medium text-gray-950'>NGN {stateTax.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between w-full text-sm font-bold text-gray-950">
                                    <span className=''>Total</span>
                                    <span className=''>NGN {totalAmount.toLocaleString()}</span>
                                </div>

                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label className='text-xs font-medium leading-5 text-gray-700'>Paying Amount</label>
                                <input
                                    type='number'
                                    placeholder='eg. N21,000'
                                    value={payingAmount}
                                    onChange={(e) => setPayingAmount(e.target.value)}
                                    className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-4 focus:outline-0 bg-transparent rounded-md'
                                />
                            </div>

                            <div className="w-full mt-3">
                                <button
                                    type="button"
                                    onClick={handleBookRoom}
                                    disabled={!fullName || !email || !phone || selectedRooms.length < 1 || payingAmount < 1}
                                    className="cursor-pointer w-full text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 uppercase hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                                >
                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Book now'}
                                </button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}