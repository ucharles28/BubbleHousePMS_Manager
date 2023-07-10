'use client'
import { useRef, useState } from "react";
import { PropertyPolicy } from "../models/propertyPolicy";
import { OptionType } from "../models/optionType";
import Select, { SingleValue } from 'react-select';
import { makeApiCall } from "../helpers/apiRequest";
import { message } from "antd";
import { CircularProgress } from "@mui/material";

export default function ProperyPolicy({ propertyPolicyPayload }: { propertyPolicyPayload: PropertyPolicy }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SingleValue<OptionType>>();
    const [isLoading, setIsLoading] = useState(false);
    const [propertyPolicy, setPropertyPolicy] = useState({ ...propertyPolicyPayload });
    const inputRef = useRef<HTMLInputElement>(null);

    const paymentMethods: OptionType[] = [
        { value: 'Cash only', label: 'Cash only' },
        { value: 'Cash & Card', label: 'Cash & Card' }
    ]

    const handlePaymentMathodSelectChange = (selectedOption: SingleValue<OptionType>) => {
        setSelectedPaymentMethod(selectedOption);
    };

    async function savePropertPolicy() {
        setIsLoading(true)
        const response = await makeApiCall('PropertyPolicy', 'POST', propertyPolicy)
        if (response.successful) {
            message.success('Property policy updated sucessfully')
        }
        else {
            message.error(response.data)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex md:flex-row flex-col items-start gap-3 w-full h-full">
            <div className="item w-full h-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Check-in time
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.checkInTime}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, checkInTime: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Check-out time
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.checkOutTime}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, checkOutTime: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Age restrictions?
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.ageRestriction}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, ageRestriction: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Are children allowed?
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.children}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, children: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Are children allowed?
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.internet}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, internet: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Paking policy
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.parking}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, parking: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Are children allowed?
                        </label>
                        <input
                            type="text"
                            value={propertyPolicy.internet}
                            onChange={(e) => setPropertyPolicy((prev) => ({...prev, internet: e.target.value}))}
                            placeholder="eg. Deluxe"
                            className="w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-medium leading-5 text-gray-700">
                            Amenities
                        </label>
                        <Select
                            options={paymentMethods}
                            value={selectedPaymentMethod}
                            onChange={handlePaymentMathodSelectChange}
                            className="w-full border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                            placeholder=''
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="flex items-center justify-end w-full mt-3">
                        <button className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                            onClick={savePropertPolicy}>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}