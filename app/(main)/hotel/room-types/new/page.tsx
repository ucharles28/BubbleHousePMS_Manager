'use client'
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ArrowLeft2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import Select, { OptionTypeBase, ValueType } from 'react-select';

function AddRoomType() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [userImageFile, setUserImageFile] = useState<File | null>(null);
    const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const clearImage = () => {
        setUserImageFile(null);
        setUserImageSrc(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUserImageFile(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                setUserImageSrc(e.target?.result?.toString() || null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (value: string[]) => {
        console.log('selected', value);
    };

    const option: OptionTypeBase[] = [
        { value: 'wifi', label: 'WiFi' },
        { value: 'gym', label: 'Gym' },
        { value: 'bar', label: 'Bar' }
    ];

    const [selectedOptions, setSelectedOptions] = useState<ValueType<OptionTypeBase>>([]);

    const handleSelectChange = (selectedOptions: ValueType<OptionTypeBase>) => {
        setSelectedOptions(selectedOptions);
    };

    return (
        <div className="min-h-screen w-full py-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-y-1 w-full">
                <p className="block md:w-full text-xl font-medium text-[#1A1A1A] leading-6">
                    Add room type
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
                <div className="item md:w-1/3 w-full h-full">
                    <div className="flex flex-col gap-3 items-center">
                        <div className="rounded-lg h-28 w-28 bg-[#1A1A1A]/25 flex items-center cursor-pointer">
                            {!userImageSrc ? (
                                <span className="flex items-center justify-center m-auto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z"
                                            fill="#666666"
                                        ></path>
                                    </svg>
                                </span>
                            ) : (
                                <img
                                    src={userImageSrc}
                                    className="rounded-lg h-28 w-28 bg-[#1A1A1A]/25 object-fill"
                                />
                            )}
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
                            Add photo
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

                <div className="item w-full h-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Room Name
                            </label>
                            <input
                                type="text"
                                placeholder="eg. Deluxe"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Max Adult
                            </label>
                            <input
                                type="text"
                                placeholder="eg. 2"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Max Children
                            </label>
                            <input
                                type="text"
                                placeholder="eg. 2"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Price per night
                            </label>
                            <input
                                type="text"
                                placeholder="eg. 200,000"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Number of Rooms
                            </label>
                            <input
                                type="text"
                                placeholder="eg. 12"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Amenities
                            </label>
                            <Select
                                isMulti
                                options={option}
                                value={selectedOptions}
                                onChange={handleSelectChange}
                                className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                placeholder='eg. WiFi'
                                classNamePrefix="select"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-medium leading-5 text-gray-700">
                                Complements
                            </label>
                            <input
                                type="text"
                                placeholder="eg. Breakfast"
                                className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                            />
                        </div>

                        <div className="flex items-center justify-end w-full mt-3">
                            <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRoomType;
