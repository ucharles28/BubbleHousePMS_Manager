'use client'
import { useRef, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { Amenity } from '../models/amenity';
import { Complement } from '../models/complement';
import { CircularProgress } from '@mui/material';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';

type OptionType = {
    value: string;
    label: string;
};

export default function AddRoomType({ amenties, complements, hotelId }: { amenties: Amenity[], complements: Complement[], hotelId: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [mainImageSrc, setMainImageSrc] = useState<string | null>('');
    const [roomImageFiles, setRoomImageFiles] = useState<Array<File> | null>([]);
    const [rooomImagesSrc, setRoomImagesSrc] = useState<string[] | null>([]);
    const [roomTypeName, setRoomTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [maxAdult, setMaxAdult] = useState('');
    const [maxChildren, setMaxChildren] = useState('');
    const [price, setPrice] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [selectedAmenities, setSelectedAmenities] = useState<MultiValue<OptionType>>([]);
    const [selectedComplements, setSelectedComplements] = useState<MultiValue<OptionType>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const clearImage = () => {
        setMainImageSrc('')
        setRoomImageFiles([])
        setRoomImagesSrc([])
    };

    const amenitiesOption: OptionType[] = amenties.map((amenity) => (
        { value: amenity.id, label: amenity.title }
    ))

    const complementsOption: OptionType[] = complements.map((complement) => (
        { value: complement.id, label: complement.title }
    ))

    const saveRoomType = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("Name", roomTypeName)
        formData.append("Description", description)
        formData.append("TotalChildren", maxChildren)
        formData.append("TotalAdult", maxAdult)
        formData.append("NumberOfRooms", numberOfRooms)
        formData.append("Price", price)
        formData.append("HotelId", hotelId)

        selectedAmenities.map((amenity, index) => {
            formData.append(`AmenityIds[${index}]`, amenity.value)
        })

        selectedComplements.map((complements, index) => {
            formData.append(`ComplimentIds[${index}]`, complements.value)
        })


        if (roomImageFiles) {
            roomImageFiles.map((file, index) => {
                formData.append(`RoomImages`, file)
            })
        }

        const response = await makeApiCall('RoomType', 'POST', formData, false)
        if (response.successful) {
            message.success('Room type saved successfully')
        } else {
            message.error(response.data)
        }

        setIsLoading(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        setIsImageLoading(true)
        const fileList = e.target.files
        let list = [...roomImageFiles?.map(file => file) ?? []]
        let files: File[] = []

        if (fileList) {
            files = Array.from(fileList);
            list.push(...files);
            setRoomImageFiles(list)
        }

        let mainImageCopy = mainImageSrc

        let roomImagesList = [...rooomImagesSrc?.map(images => images) ?? []]
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                debugger
                if (!mainImageCopy) {
                    mainImageCopy = reader?.result as string
                    setMainImageSrc(reader?.result as string);
                } else {
                    roomImagesList.push(reader?.result as string)
                }
            };
            reader.readAsDataURL(files[i]);
        }
        setRoomImagesSrc(roomImagesList)
        console.log(roomImageFiles)
        setIsImageLoading(false)
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const option: OptionType[] = [
        { value: 'wifi', label: 'WiFi' },
        { value: 'gym', label: 'Gym' },
        { value: 'bar', label: 'Bar' }
    ];


    const handleAmenitiesSelectChange = (selectedOptions: MultiValue<OptionType>) => {
        setSelectedAmenities(selectedOptions);
    };

    const handleComplementSelectChange = (selectedOptions: MultiValue<OptionType>) => {
        setSelectedComplements(selectedOptions);
    };

    return (
        <div className="flex md:flex-row flex-col items-start gap-3 w-full h-full">
            <div className='item w-2/6 h-full'>
                <div className='flex flex-col items-center'>
                    <div className="rounded-lg h-36 w-36 bg-[#1A1A1A]/25 flex items-center">

                        {!mainImageSrc ? <span className='flex items-center justify-center m-auto'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                        </span> :
                            <img src={mainImageSrc} className='rounded-lg h-36 w-36 bg-[#1A1A1A]/25 object-cover' />}
                    </div>

                    <div className='grid overflow-hidden grid-cols-3 h-auto items-center gap-3 mt-5'>

                        {rooomImagesSrc && rooomImagesSrc.map((imageSrc) => (<div className="box rounded-lg h-14 w-14 bg-[#1A1A1A]/25 flex items-center">
                            <img src={imageSrc} className='rounded-lg h-14 w-14 object-cover' />
                        </div>))}

                    </div>
                    <input
                        style={{ display: 'none' }}
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple={true}
                        onChange={handleFileChange}
                    />

                    <div className="mt-5 flex justify-center items-center gap-1">
                        <button
                            type="button"
                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                            onClick={handleClick}
                        >
                            Upload photo
                        </button>
                        {isImageLoading && <CircularProgress size={20} color="inherit" />}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                            onClick={clearImage}
                        >
                            Reset
                        </button>
                    </div>
                    <span className="text-xs leading-5 font-normal mt-4">Allow JPEG, GIF, or PNG. Max size of 800KB</span>
                </div>
            </div>
            <div className="item w-full h-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Room Name
                        </label>
                        <input
                            type="text"
                            value={roomTypeName}
                            onChange={(e) => setRoomTypeName(e.target.value)}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            // value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        ></textarea>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Max Adult
                        </label>
                        <input
                            type="number"
                            placeholder="eg. 2"
                            value={maxAdult}
                            onChange={(e) => setMaxAdult(e.target.value)}
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Max Children
                        </label>
                        <input
                            type="number"
                            value={maxChildren}
                            onChange={(e) => setMaxChildren(e.target.value)}
                            placeholder="eg. 2"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Price per night
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="eg. 200,000"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Number of Rooms
                        </label>
                        <input
                            type="number"
                            placeholder="eg. 12"
                            value={numberOfRooms}
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Amenities
                        </label>
                        <Select
                            isMulti
                            options={amenitiesOption}
                            value={selectedAmenities}
                            onChange={handleAmenitiesSelectChange}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder='eg. WiFi'
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Complements
                        </label>
                        <Select
                            isMulti
                            options={complementsOption}
                            value={selectedComplements}
                            onChange={handleComplementSelectChange}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder='eg. Breakfast'
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="flex items-center justify-end w-full mt-3">
                        <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                            disabled={!roomTypeName}
                            onClick={saveRoomType}>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}