'use client'
import { useEffect, useState } from 'react'
import { makeApiCall } from '../helpers/apiRequest'
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress } from '@mui/material';
import { message } from 'antd';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const UpgradeRoom = ({ bookedRooms, bookedRoomTypes, hotelId, booking, onClose }) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [roomTypeOptions, setRoomTypeOptions] = useState([])
    const [bookedRoomsOptions, setBookedRoomsOptions] = useState()
    const [selectedRoomsTypeOption, setSelectedRoomsTypeOption] = useState({ 0: {} })
    const [selectedRoomsOption, setSelectedRoomsOption] = useState({ 0: [] })
    const [roomsOptions, setRoomOptions] = useState([])
    const [overridePrice, setOverridePrice] = useState(false)
    const [includeTax, setIncludeTax] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        async function fetchRoomTypes() {
            const response = await makeApiCall(`RoomType/Hotel/${hotelId}`, 'GET');
            if (response.successful) {
                setRoomTypes(response.data)
                const tempOptions = response.data.map((roomType) => ({
                    label: roomType.name,
                    value: roomType.id,
                }))
                setRoomTypeOptions(tempOptions)

                bookedRoomTypes.forEach((roomType, index) => {
                    var roomTypeOption = tempOptions.find((option) => option.value === roomType.roomTypeId)
                    if (roomTypeOption) {
                        handleRoomTypeSelect(roomTypeOption, index)
                    }
                })
            }
        }

        if (hotelId) {
            fetchRoomTypes()
        }
    }, [hotelId])

    useEffect(() => {
        if (Object.keys(selectedRoomsOption).length > 0 && selectedRoomsOption[0].length > 0) {
            let tempTotalAmount = 0;
            Object.keys(selectedRoomsOption).forEach((key) => {
                const roomType = selectedRoomsTypeOption[key]
                const roomPrice = roomTypes.find((rt) => rt.id == roomType.value).price
                tempTotalAmount += (roomPrice * selectedRoomsOption[key].length)
                setTotalAmount(tempTotalAmount)
            })
        }
    }, [selectedRoomsOption])

    async function fetchRoomsByRoomType(roomTypeId, index) {
        const request = {
            roomTypeId,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
        }
        const response = await makeApiCall(`Room/RoomType/GetAvailableRooms`, 'POST', request);
        if (response.successful) {
            setRoomOptions((prevState) => {
                const newState = { ...prevState }
                newState[index] = response.data.map((room) => ({
                    label: room.roomNumber,
                    value: room.id,
                }))
                return newState
            })

            setSelectedRoomsOption((prevState) => {
                const newState = { ...prevState }
                newState[index] = []
                return newState
            })

            setTotalAmount(0)
        }
    }

    async function handleRoomTypeSelect(e, index) {
        setSelectedRoomsTypeOption((prevState) => {
            const newState = { ...prevState }
            newState[index] = e
            return newState
        })
        await fetchRoomsByRoomType(e.value, index)
    }

    async function handleRoomSelect(e, index) {
        if (e.length > bookedRoomTypes[index].numberBookedRooms) {
            return
        }

        setSelectedRoomsOption((prevState) => {
            const newState = { ...prevState }
            newState[index] = e
            return newState
        })
    }

    async function upgradeRoom() {
        setIsLoading(true)

        const roomTypesReq = Object.keys(selectedRoomsTypeOption).map((key) => {
            if (roomTypes.some((rt) => rt.id === selectedRoomsTypeOption[key].value)) {
                var roomType = roomTypes.find((rt) => rt.id === selectedRoomsTypeOption[key].value)
                return {
                    id: roomType.id,
                    price: roomType.price,
                }
            }
        })

        const request = {
            bookingId: booking.id,
            includeTax,
            totalAmount,
            bookedRoomTypes: roomTypesReq,
            bookedRoomIds: Object.keys(selectedRoomsOption).map((key) => (selectedRoomsOption[key].map((room) => room.value)))
        }

        const response = await makeApiCall(`Booking/Hotel/UpgradeRoom`, 'POST', request);        
        if (response.successful) {
            message.success('Room upgraded successfully')
        } else {
            message.error(response.data)
        }

        setIsLoading(false)
        onClose(true)
    }


    return (

        <div className='flex flex-col p-4 h-screen gap-4 p-4 w-full'>
            <div className="flex flex-col gap-8">
                <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Upgrade Room
                </p>
                <div className="flex flex-col gap-6">
                    {bookedRoomTypes.map((bookedRoomType, index) => (
                        <div className="flex flex-col gap-4">

                            <div className="grid grid-cols-3 items-center gap-4">
                                <p className='text-sm font-normal text-[#1A1A1A]'>Room Type:</p>
                                <Select
                                    options={roomTypeOptions}
                                    value={selectedRoomsTypeOption[index]}
                                    onChange={(e) => handleRoomTypeSelect(e, index)}
                                    className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                    // placeholder='eg. WiFi'
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <p className='text-sm font-normal text-[#1A1A1A]'>Room(s):</p>
                                <Select
                                    isMulti
                                    options={roomsOptions[index]}
                                    value={selectedRoomsOption[index]}
                                    onChange={(e) => handleRoomSelect(e, index)}
                                    className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    ))
                    }

                    <div className="grid grid-cols-3 items-center gap-4">
                        <p className='text-sm font-normal text-[#1A1A1A]'>Override Price:</p>
                        <Checkbox className='' checked={overridePrice} onChange={() => setOverridePrice(!overridePrice)} />
                    </div>

                    <div className='grid grid-cols-3 gap-4 w-full items-center'>
                        <label className='text-sm font-font-normal text-[#1A1A1A]'>Rate Per Night: </label>
                        <input
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            role="input"
                            disabled={!overridePrice}
                            className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full col-span-2 pl-3 placeholder:font-normal placeholder:text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <p className='text-sm font-normal text-[#1A1A1A]'>Tax Inclusive:</p>
                        <Checkbox className='' checked={includeTax} onChange={() => setIncludeTax(!includeTax)} />
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full items-end">
                <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                    <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                    <button onClick={upgradeRoom} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpgradeRoom
