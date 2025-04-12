'use client'
import { Checkbox, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../helpers/apiRequest';
import Select from 'react-select';
import { message } from 'antd';

const AddExtraRoomToBooking = ({ hotelId, booking, onClose }) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [roomTypeOptions, setRoomTypeOptions] = useState([])
    const [roomOptions, setRoomOptions] = useState({ 0: [] })
    const [selectedValues, setSeletcedValues] = useState([{
        roomType: { label: '', value: '' },
        room: { label: '', value: '' }
    }])
    const [isLoading, setIsLoading] = useState(false)
    // const [selectedRoomTypesOption, setSelectedRoomTypesOption] = useState({
    //     0: { label: '', value: '' }
    // })

    // const [selectedRoomsOption, setSelectedRoomsOption] = useState({
    //     0: { label: '', value: '' }
    // })

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
            }
        }

        if (hotelId) {
            fetchRoomTypes()
        }
    }, [hotelId])

    function addRoom() {
        setSeletcedValues([...selectedValues, {
            roomType: { label: '', value: '' },
            room: { label: '', value: '' }
        }])
    }

    async function saveRoom() {
        setIsLoading(true)
        const request = selectedValues.map((value) => ({
            roomId: value.room.value,
            roomPrice: roomTypes.find((roomType) => roomType.id == value.roomType.value).price,
            roomTypeId: value.roomType.value,
        }))

        const response = await makeApiCall(`Booking/Hotel/AddRoomToBooking/${booking.id}`, 'PUT', request);
        if (response.successful) {
            message.success('Room added successfully')
            onClose()
        } else {
            message.error('Error adding room')
        }

        setIsLoading(false)
    }

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
        }
    }

    async function handleRoomTypeSelect(e, index) {
        const temp_roomtype = [...selectedValues]
        temp_roomtype[index].roomType = e
        setSeletcedValues(temp_roomtype)

        await fetchRoomsByRoomType(e.value, index)
    }

    async function handleRoomSelect(e, index) {
        setSeletcedValues((prevState) => {
            const newState = [...prevState]
            newState[index].room = e
            return newState
        })
    }


    return (
        <div className='flex flex-col p-4 h-screen gap-4 p-4 w-full'>
            <div className="flex flex-col gap-8">
                <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Add Room
                </p>
                <div className="flex flex-col gap-6">
                    {selectedValues.map((room, index) => (
                        <div className="flex flex-col gap-4">

                            <div className="grid grid-cols-3 items-center gap-4">
                                <p className='text-sm font-normal text-[#1A1A1A]'>Room Type:</p>
                                <Select
                                    options={roomTypeOptions}
                                    value={selectedValues[index].roomType}
                                    onChange={(e) => handleRoomTypeSelect(e, index)}
                                    className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                    // placeholder='eg. WiFi'
                                    classNamePrefix="select"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <p className='text-sm font-normal text-[#1A1A1A]'>Room(s):</p>
                                <Select
                                    options={roomOptions[index]}
                                    value={selectedValues[index].room}
                                    onChange={(e) => handleRoomSelect(e, index)}
                                    className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                    classNamePrefix="select"
                                />
                            </div>
                        </div>
                    ))
                    }
                    <div className="flex justify-start">
                        <button onClick={addRoom} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                            Add Room
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full items-end">
                <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                    <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                    <button onClick={saveRoom} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddExtraRoomToBooking
