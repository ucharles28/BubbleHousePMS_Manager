'use client'

import { CircularProgress } from "@mui/material";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { makeApiCall } from "../helpers/apiRequest";
import { message } from "antd";

export default function HotelDetails({ hotelPayload }: { hotelPayload: any }) {
    const router = useRouter()

    const [hotel, setHotel] = useState({ ...hotelPayload });
    const [hotelImageFile, setHotelImageFile] = useState<File | null>();
    const [hotelImageSrc, setHotelImageSrc] = useState<string | undefined>(hotelPayload ? hotelPayload.imageUrl : '');
    const [address, setAddress] = useState<string | undefined>(hotelPayload ? hotelPayload.address.line : '');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const clearImage = () => {
        setHotelImageFile(null)
        setHotelImageSrc('')
    }

    const goBack = () => [
        router.back()
    ]

    const updateHotel = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("Name", hotel.name)
        formData.append("Description", hotel.description)
        formData.append("Address", address ? address : '')
        formData.append("Email", hotel.email)
        formData.append("PhoneNumber", hotel.phoneNumber)
        formData.append("AltPhoneNumber", hotel.altPhoneNumber)
        // formData.append("AccountCode", hotel.accountCode)
        formData.append("City", hotel.city)
        if (hotelImageFile) {
            formData.append("ImageFile", hotelImageFile)
        }
        formData.append("NumberOfRooms", hotel.numberOfRooms)
        formData.append("HotelId", hotel.id)

        const response = await makeApiCall('Hotel/UpdateDetails', 'POST', formData, false)
        if (response.successful) {
            message.success('Hotel update successfully')
        } else {
            message.error(response.data)
        }
        setIsLoading(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e?.target?.files) {
            return
        }
        const file = e.target.files[0]
        setHotelImageFile(file)
        const reader = new FileReader();
        reader.onload = function (e) {
            setHotelImageSrc(reader?.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };
    return (
        <div className="min-h-screen w-full py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-y-1 w-full">
                <p className="block md:w-full text-xl font-medium text-[#1A1A1A] leading-6">
                    Hotel details
                </p>

                <div
                    onClick={goBack}
                    className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft2 size={14} />
                    <span className="text-xs font-medium leading-6">Back</span>
                </div>
            </div>

            <div className='bg-white drop-shadow-sm rounded-lg w-full overflow-auto p-4'>
                <div className="flex md:flex-row flex-col items-start gap-3 w-full h-full">

                    <div className='item md:w-1/3 w-full h-full'>
                        <div className='flex flex-col gap-3 items-center'>

                            <div className="rounded-lg h-28 w-28 bg-[#1A1A1A]/25 flex items-center cursor-pointer" onClick={handleClick}>

                                {!hotelImageSrc ? <span className='flex items-center justify-center m-auto'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                </span> :
                                    <img src={hotelImageSrc} className='rounded-lg h-28 w-28 bg-[#1A1A1A]/25 object-fill' />}
                            </div>

                            <input
                                style={{ display: 'none' }}
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                            />

                            <button
                                type="button"
                                className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                                onClick={handleClick}
                            >
                                Upload photo
                            </button>

                            <button
                                type="button"
                                className="text-[#666666] font-medium flex items-center px-3 py-1.5 rounded-md border-[#1a1a1a]/50 border text-xs leading-6 uppercase hover:bg-[#636363] hover:text-white"
                                onClick={clearImage}
                            >
                                Reset
                            </button>

                            <span className="text-xs leading-5 font-normal">
                                Allow JPEG, GIF, or PNG. Max size of 800KB
                            </span>
                        </div>
                    </div>

                    <div className='item w-full h-full'>
                        <div className='flex flex-col gap-4 w-full'>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Hotel Name</label>
                                <input
                                    type='text'
                                    placeholder='Hotel Name'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.name}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Hotel Description</label>
                                <textarea
                                    placeholder='Description'
                                    rows={4}
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.description}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, description: e.target.value }))}
                                >
                                </textarea>
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Address</label>
                                <input type="text"
                                    placeholder='Enter Hotel Address'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>State/City</label>
                                <input
                                    type='text'
                                    placeholder='State/City'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.city}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, city: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.email}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
                                <input
                                    type='phone'
                                    placeholder='Phone Number'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.phoneNumber}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Alternative Phone Number</label>
                                <input
                                    type='phone'
                                    placeholder='Alternative Phone Number'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.altPhoneNumber}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, altPhoneNumber: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Hotel Account Number</label>
                                <input
                                    type='phone'
                                    placeholder='Hotel Account Number'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.accountCode}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, accountCode: e.target.value }))}
                                />
                            </div>

                            <div className="flex flex-col space-y-1" >
                                <label className='text-xs font-medium leading-5 text-gray-700'>Number of Rooms</label>
                                <input
                                    type='number'
                                    placeholder='Number of Rooms'
                                    className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                    value={hotel.numberOfRooms}
                                    onChange={(e) => setHotel((prev: any) => ({ ...prev, numberOfRooms: e.target.value }))}
                                />
                            </div>

                            <div className="flex items-center w-full gap-4">
                                <button
                                    type="button"
                                    className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                                    onClick={updateHotel}
                                // disabled={!hotelName || !description || !address || !email || !phone || !numberOfRooms || !selectedManager || !city || !accNo}
                                >
                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                                </button>

                                <button
                                    type="button"
                                    className="text-[#666666] font-medium flex items-center px-3 py-1.5 rounded-md border-[#1a1a1a]/50 border text-xs leading-6 uppercase hover:bg-[#636363] hover:text-white"
                                    onClick={goBack}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}