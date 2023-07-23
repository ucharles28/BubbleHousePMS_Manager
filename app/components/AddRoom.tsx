'use client'
import { useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { OptionType } from '../models/optionType';
import { CircularProgress } from '@mui/material';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeft2 } from 'iconsax-react';

export default function AddRoom({ bedTypes, roomTypes, hotelId }: { bedTypes: any[], roomTypes: any[], hotelId: string }) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [roomNumbers, setRoomNumbers] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState<SingleValue<OptionType>>();
    const [selectedBedType, setSelectedBedType] = useState<SingleValue<OptionType>>();
    const [isLoading, setIsLoading] = useState(false);
    
    const goBack = () => {
        router.back();
    };

    const roomTypesOption: OptionType[] = roomTypes.map((roomType) => (
        { value: roomType.id, label: roomType.name }
    ))

    const bedTypesOption: OptionType[] = bedTypes.map((bedType) => (
        { value: bedType.id, label: bedType.name }
    ))

    const saveRoom = async () => {
        setIsLoading(true)
        const splitRoomNumbers = roomNumbers.split(',')
        const validRoomNumbers = splitRoomNumbers.map((number) => {
            number = number.trim();
            if (!Number.isNaN(number)) {
                return Number(number)
            }
        })

        const req = {
            bedTypeId: selectedBedType?.value,
            roomTypeId: selectedRoomType?.value,
            roomNumbers: validRoomNumbers,
        }

        const response = await makeApiCall('Room', 'POST', req)
        if (response.successful) {
            message.success('Room type saved successfully')
        } else {
            message.error(response.data)
        }

        setIsLoading(false)
    }

    const handleRoomTypeSelectChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedRoomType(selectedOption);
    };

    const handleBedTypeSelectChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedBedType(selectedOption);
    };

    return (
        <div className="min-h-screen w-full py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-y-1 w-full">
                <p className="block md:w-full text-xl font-medium text-[#1A1A1A] leading-6">
                    Add room
                </p>

                <div
                    onClick={goBack}
                    className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft2 size={14} />
                    <span className="text-xs font-medium leading-6">Back</span>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-3 w-full h-full">
                <div className="item w-full h-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Room Type
                            </label>
                            <Select
                                options={roomTypesOption}
                                value={selectedRoomType}
                                onChange={handleRoomTypeSelectChange}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                placeholder='Select room type'
                                classNamePrefix="select"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Bed Type
                            </label>
                            <Select
                                options={bedTypesOption}
                                value={selectedBedType}
                                onChange={handleBedTypeSelectChange}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                placeholder='Select bed type'
                                classNamePrefix="select"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Room Numbers (comma seperated)
                            </label>
                            <input
                                type="text"
                                value={roomNumbers}
                                onChange={(e) => setRoomNumbers(e.target.value)}
                                placeholder="eg. 120, 100, 101"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>


                        <div className="flex items-center justify-end w-full mt-3">
                            <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                                disabled={!roomNumbers || !selectedBedType || !selectedRoomType}
                                onClick={saveRoom}>
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}