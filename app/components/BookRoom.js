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
import { Checkbox, CircularProgress, Drawer } from "@mui/material"
import { message } from "antd"
import AddPayment from "./AddPayment"
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;


export default function BookRoom({ hotelId, companies }) {
    const router = useRouter()

    const companyOptions = companies.map((company) => ({
        value: company.id,
        label: company.name
    }));

    const bookingTypeOptions = [
        {
            label: 'Individual',
            value: 1,
        },
        {
            label: 'Corporate',
            value: 2,
        },
        {
            label: 'Group',
            value: 3,
        },
    ]

    const goBack = () => {
        router.back()
    }

    const [selectedBookingType, setSelectedBookingType] = useState()
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [openDate, setOpenDate] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [searchRoomIsLoading, setSearchRoomIsLoading] = useState(false);
    const [isComplementary, setIsComplementary] = useState(false);
    const [stateTax, setStateTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [vat, setVat] = useState(0)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [selectedRoomType, setSelectedRoomType] = useState();
    const [roomTypes, setRoomTypes] = useState([]);
    const [roomTypesOptions, setRoomTypesOptions] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        amount: 0,
        paymentMethod: ''
    })
    const [selectedCompany, setSelectedCompany] = useState({
        label: '',
        value: ''
    })

    const [selectedRoomTypes, setSelectedRoomTypes] = useState([{
        roomType: { label: '', value: '' },
        numberOfRooms: { label: 0, value: 0 },
        availableRooms: [],
        roomPrice: 0,
    }])

    function handleCloseDrawer() {
        setOpenDrawer(false)
    }

    function handleOpenDrawer() {
        setOpenDrawer(true)
    }

    function savePaymentInfo(thePaymentInfo) {
        setPaymentInfo(thePaymentInfo)
        handleCloseDrawer()
    }

    const datePickerHandler = () => {
        setOpenDate(!openDate);
    };

    useEffect(() => {
        if (selectedRoomTypes.length > 0 && selectedRoomTypes[0].roomType && !isComplementary) {
            let totalRoomsPrice = selectedRoomTypes
                .map(item => (item.roomPrice * item.numberOfRooms.value))
                .reduce((prev, next) => prev + next);

            totalRoomsPrice *= numberOfDays
            const theVat = 0.075 * totalRoomsPrice
            const theStateTax = 0.05 * totalRoomsPrice
            setVat(theVat)
            setStateTax(theStateTax)
            setSubTotal(totalRoomsPrice)
            if (paymentInfo) {
                setTotalAmount((theVat + theStateTax + totalRoomsPrice) - paymentInfo.amount)
                return
            }
            setTotalAmount((theVat + theStateTax + totalRoomsPrice))

        } else {
            setTotalAmount(0)
            setVat(0)
            setStateTax(0)
            setSubTotal(0)
        }
    }, [selectedRoomTypes, isComplementary, paymentInfo])


    useEffect(() => {
        const days = dateDiffInDays(dateFrom, dateTo)
        setNumberOfDays(days)
        getRoomTypesAvailablity()
    }, [dateTo])



    async function getRoomTypesAvailablity() {
        const request = {
            checkInDate: dateFrom,
            checkOutDate: dateTo,
            hotelId
        }
        const response = await makeApiCall('Hotel/BookingDetails', 'POST', request)
        if (response.successful) {
            setRoomTypes(response.data.roomTypes)
            setRoomTypesOptions(response.data.roomTypes.map((roomType) => (
                { value: roomType.id, label: roomType.name }
            )))
        }
    }


    const handleRoomTypeSelectChange = (selectedOption, index) => {
        const roomType = roomTypes.find((roomType) => roomType.id == selectedOption.value)
        let temp_list = []
        for (let i = 1; i <= roomType.numberOfAvailableRooms; i++) {
            temp_list.push({
                label: i,
                value: i,
            })
        }
        setSelectedRoomTypes((prevState) => {
            const newState = [...prevState]
            newState[index].roomType = selectedOption
            newState[index].roomPrice = roomTypes.find((roomType) => roomType.id == selectedOption.value).price
            newState[index].availableRooms = temp_list
            return newState
        })
    };

    const handleNumberOfRoomsChange = (selectedOption, index) => {
        setSelectedRoomTypes((prevState) => {
            const newState = [...prevState]
            newState[index].numberOfRooms = selectedOption
            return newState
        })
    };

    const handleRoomPriceChange = (value, index) => {
        setSelectedRoomTypes((prevState) => {
            const newState = [...prevState]
            newState[index].roomPrice = value
            return newState
        })
    };

    function addRoom() {
        const temp_list = [...selectedRoomTypes]
        temp_list.push({
            roomType: { label: '', value: '' },
            numberOfRooms: { label: 0, value: 0 },
            availableRooms: [],
            roomPrice: 0,
        })

        setSelectedRoomTypes(temp_list)
    }

    function handleSelectRoom(index) {
        let list = [...rooms]
        const room = list[index]
        if (room.status === 2) {//if already selected
            handleRemoveRoomType(room)
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
            checkOutDate: dateTo,
            checkInDate: dateFrom,
            email,
            fullName,
            vATAmount: vat,
            hotelId,
            isMainGuest: true,
            isReservation: (paymentInfo && paymentInfo.amount > 0),
            phone,
            StateTaxAmount: stateTax,
            totalAmount: (subTotal + vat + stateTax) - paymentInfo.amount,
            isComplementary,
            totalRoomPrice: subTotal,
            bookingType: selectedBookingType.value,
            companyId: selectedCompany ? selectedCompany.value : null,
            amountPaid: paymentInfo ? paymentInfo.amount : 0,
            paymentMethod: paymentInfo ? paymentInfo.paymentMethod : '',
            totalAdults: 1
        }

        const filterdRoomTypes = selectedRoomTypes.filter((roomType) => (roomType.roomType.value !== '' || roomType.numberOfRooms.value !== 0))

        const bookedRoomTypeList = filterdRoomTypes.map((roomType) => (
            {
                numberOfRoomsBooked: roomType.numberOfRooms.value,
                roomPrice: roomType.roomPrice,
                roomTypeId: roomType.roomType.value,
            }
        ))

        request.roomTypes = bookedRoomTypeList

        const response = await makeApiCall('Booking/Hotel/Create', 'POST', request)

        if (response.successful) {
            message.success('Booking created successfully')
            resetFormValues();
        } else {
            message.error(response.data)
        }

        setIsLoading(false)
    }

    function resetFormValues() {
        setSelectedRoomTypes([{
            roomType: { label: '', value: '' },
            numberOfRooms: { label: 0, value: 0 },
            availableRooms: [],
            roomPrice: 0,
        }])
        setFullName('')
        setEmail('')
        setPhone('')
        setSelectedBookingType({ value: '', label: '' })
        setPaymentInfo({ amount: 0, paymentMethod: '' })
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    function handleRemoveRoomType(room) {
        let list = [...selectedRoomTypes]
        const index = list.indexOf(room)
        list.splice(index, 1)
        setSelectedRoomTypes(list)
    }

    const onChange = (date, dateString) => {
        setDateFrom(new Date(dateString[0]));
        setDateTo(new Date(dateString[1]));
      };

    // const getRooms = async () => {
    //     setSearchRoomIsLoading(true)
    //     const request = {
    //         checkInDate: dateFrom,
    //         checkOutDate: dateTo,
    //         roomTypeIds: [selectedRoomType.value],
    //         numberOfRooms,
    //         hotelId
    //     }

    //     const response = await makeApiCall('Room/Hotel/GetAvailableRooms', 'POST', request)
    //     if (response.successful) {
    //         setRooms(response.data.map((room) => {
    //             if (selectedRooms.some(item => item.id === room.id)) {
    //                 room.status = 2
    //             }
    //             return room
    //         }))
    //     } else {
    //         message.error(response.data)
    //     }
    //     setSearchRoomIsLoading(false)
    // }

    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <Drawer
                anchor={'right'}
                open={openDrawer}
                onClose={() => handleCloseDrawer()}
            >
                <div className="flex w-full md:w-[350px] lg:w-[550px] h-full">
                    <AddPayment onClose={handleCloseDrawer} savePaymentInfo={savePaymentInfo} />
                </div>
            </Drawer>
            <div className='flex flex-col items-end gap-y-2 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Book room
                </p>

                <div className='flex justify-end gap-2 w-full'>
                    <button
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-y-4 w-full'>
                {/* First section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full border-b-2 border-[#1A1A1A]/3 pb-6">
                    <div className="flex items-end gap-1">
                        <div className="relative flex flex-col gap-1 w-full md:col-span-1">
                            <label className='text-xs font-medium leading-5 text-gray-700'>Check In/Out</label>
                            <RangePicker onChange={onChange}  className="p-4"/>
                            {/* <div
                                className="bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-2 focus:outline-0 bg-transparent rounded-md flex items-center gap-2 cursor-pointer"
                                onClick={datePickerHandler}
                            >
                                {`${format(dateFrom, "dd-MM-yyy")} - ${format(
                                    dateTo,
                                    "dd-MM-yyy"
                                )}`}
                            </div>

                            {openDate && (
                                <div className="absolute mt-16 left-0 z-50">
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
                            )} */}

                        </div>

                        <div className="flex flex-col bg-[#FFDD55] w-12 text-gray-800 items-center px-7 pt-1 pb-1">
                            <p className="text-base">{numberOfDays}</p>
                            <p className="text-xs">Nights</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full md:col-span-1 h-full">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Booking Type</label>
                        <Select
                            options={bookingTypeOptions}
                            value={selectedBookingType}
                            onChange={(e) => setSelectedBookingType(e)}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder='Select room type'
                            classNamePrefix="select"
                        />
                    </div>

                    {(selectedBookingType && selectedBookingType.value === 2) && <div className="flex flex-col gap-1 w-full md:col-span-1 h-full">
                        <label className='text-xs font-medium leading-5 text-gray-700'>Company</label>
                        <Select
                            options={companyOptions}
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e)}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder='Select room type'
                            classNamePrefix="select"
                        />
                    </div>}

                </div>

                {/* Second section */}
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex w-full w-full justify-end">
                        <div className="flex items-center">
                            <Checkbox checked={isComplementary} onChange={(e) => setIsComplementary(e.target.checked)} />
                            <p className='text-sm text-[#636363] font-medium leading-6 w-full'>Complementary Room</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 md:grid-cols-3 gap-3 w-full'>
                        <p className='text-xs font-medium leading-5 text-gray-700'>Room Type</p>
                        <p className='text-xs font-medium leading-5 text-gray-700'>No. of Rooms</p>
                        <p className='text-xs font-medium leading-5 text-gray-700'>Price</p>


                        {selectedRoomTypes.map((roomType, index) => (<>
                            <Select
                                options={roomTypesOptions}
                                value={selectedRoomTypes[index].roomType}
                                onChange={(e) => handleRoomTypeSelectChange(e, index)}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                placeholder='Select room type'
                                classNamePrefix="select"
                            />

                            <Select
                                options={selectedRoomTypes[index].availableRooms}
                                value={selectedRoomTypes[index].numberOfRooms}
                                onChange={(e) => handleNumberOfRoomsChange(e, index)}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                placeholder='Select room type'
                                classNamePrefix="select"
                            />

                            <input
                                type='number'
                                placeholder='eg. 2'
                                value={selectedRoomTypes[index].roomPrice}
                                onChange={(e) => handleRoomPriceChange(e.target.value, index)}
                                className='bg-white w-full border-[1.2px] border-[#E4E4E4] placeholder:text placeholder:text-xs text-sm font-normal p-2 focus:outline-0 bg-transparent rounded-md'
                            />
                        </>))}

                        <div className="flex justify-start w-full mt-3">
                            <button
                                type="button"
                                // disabled={!selectedRoomType || (dateFrom > dateTo) || (numberOfRooms < 1)}
                                onClick={addRoom}
                                className="text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 capitalize hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                            >
                                {searchRoomIsLoading ? <CircularProgress size={20} color="inherit" /> : 'Add Room'}
                            </button>

                        </div>

                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full gap-3'>

                    {/* <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
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
                    </div> */}

                    <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
                        <p className='mb-[0] text-sm text-[#636363] font-medium leading-6 w-full'>User Information</p>

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

                        </div>
                    </div>
                    <div className='flex flex-col w-full h-auto gap-y-4 justify-start bg-white border-[1.2px] border-[#E4E4E4] rounded-md p-3'>
                        <p className='mb-[0] text-sm text-[#636363] font-medium leading-6 w-full'>Price Breakdown</p>

                        <div className='grid grid-cols-1 w-full gap-6'>

                            <div className="flex flex-col gap-2 w-full">
                                <div className='grid grid-cols-3 w-full justify-between gap-1'>
                                    <span className='text-xs font-semibold leading-6 flex justify-start'>Rooms</span>
                                    <span className='text-xs font-semibold leading-6 flex justify-center'>Days</span>
                                    <span className='text-xs font-semibold leading-6 flex justify-end'>Room price</span>
                                </div>

                                {selectedRoomTypes.map((roomType, index) => (<div key={index} className='grid grid-cols-3 w-full items-center justify-between text-[#636363] text-xs gap-1'>
                                    <div className="flex gap-1.5 items-center w-full justify-start">
                                        <span
                                            className="px-2.5 py-1 rounded-lg bg-[#FF6166] text-xs font-medium text-white cursor-pointer"
                                            onClick={() => handleRemoveRoomType(roomType)}
                                        >
                                            x
                                        </span>
                                        <span className='font-normal leading-6'>{roomType.numberOfRooms.label}</span>
                                    </div>
                                    <span className='font-normal leading-6 w-full flex justify-center'>
                                        {numberOfDays}
                                    </span>
                                    <span className='font-normal leading-6 w-full flex justify-end'>
                                        NGN {roomType.roomPrice ? Number(roomType.roomPrice).toLocaleString() : Number(roomType.roomPrice)}
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

                                {paymentInfo && <div className="flex items-center justify-between w-full text-xs font-normal text-[#636363]">
                                    <span className=''>Payment </span>
                                    <span className='font-medium text-gray-950'>- NGN {paymentInfo.amount.toLocaleString()}</span>
                                </div>}

                                <div className="flex items-center justify-between w-full text-sm font-bold text-gray-950">
                                    <span className=''>Due Amount</span>
                                    <span className=''>NGN {totalAmount.toLocaleString()}</span>
                                </div>

                            </div>

                            <div className="w-full mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleOpenDrawer}
                                    // disabled={!fullName || !email || !phone || selectedRooms.length < 1 || (payingAmount < 1 && !isComplementary) || (dateFrom > dateTo) || isLoading}
                                    className="cursor-pointer text-gray-800 font-medium flex items-center justify-center p-3 rounded-md bg-[#F5C400] text-xs tracking-wide leading-6 uppercase hover:bg-[#f1ce40] disabled:bg-[#FFDD55]"
                                >
                                    Add Payment
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="flex h-full w-full items-end">
                <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                    <button className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                    <button onClick={handleBookRoom} disabled={!fullName || !email || !phone || (selectedRoomTypes.length < 1 || !selectedRoomTypes[0].roomType.label) || (dateFrom > dateTo) || isLoading} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Book now'}
                    </button>
                </div>
            </div>
        </div>
    )
}