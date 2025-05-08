'use client'
import React from 'react'
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';

const AddPayment = ({onClose, savePaymentInfo, showSurchargeFee}) => {
    const paymentMethodOptions = [
        {
            value: 'Cash',
            label: 'Cash'
        },
        {
            value: 'Credit',
            label: 'Credit'
        },
        {
            value: 'Bank Transfer',
            label: 'Bank Transfer'
        },
        {
            value: 'Debit Card',
            label: 'Debit Card'
        },
    ]

    const surchargeFeeStatusOptions = [
        {
            value: true,
            label: 'Paid'
        },
        {
            value: false,
            label: 'Refunded'
        }
    ]

    const [selectedPaymenthMethod, setSelectedPaymentMethod] = React.useState(null)
    const [selectedSurchargeFeeStatus, setSelectedSurchargeFeeStatus] = React.useState(null)
    const [amount, setAmount] = React.useState()
    const [isSurchargeFee, setIsSurchargeFee] = React.useState(false)

    function setPaymentInfo() {
        if (isSurchargeFee && !selectedPaymenthMethod) {
            return;
        }

        const thePaymentInfo = {
            amount,
            paymentMethod: selectedPaymenthMethod.value,
            isSurcharge: isSurchargeFee,
            isAdded: isSurchargeFee ? selectedSurchargeFeeStatus.value : true,
        }

        savePaymentInfo(thePaymentInfo)
    }


  return (
    <div className='flex flex-col p-4 h-screen gap-4 p-4 w-full'>
                <div className="flex flex-col gap-8">
                    <p className='block md:w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                        Add Payment
                    </p>
                    <div className="flex flex-col gap-6">
                        
                            <div className="flex flex-col gap-4">
    
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <p className='text-sm font-normal text-[#1A1A1A]'>Payment Method:</p>
                                    <Select
                                        options={paymentMethodOptions}
                                        value={selectedPaymenthMethod}
                                        onChange={(e) => setSelectedPaymentMethod(e)}
                                        className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                        // placeholder='eg. WiFi'
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-4 w-full items-center'>
                                    <label className='text-sm font-font-normal text-[#1A1A1A]'>Amount: </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        role="input"
                                        className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                    />
                                </div>
                                {showSurchargeFee && <div className="grid grid-cols-3 items-center gap-4">
                                    <p className='text-sm font-normal text-[#1A1A1A]'>Surchage Fee:</p>
                                    <Checkbox className='' checked={isSurchargeFee} onChange={() => setIsSurchargeFee(!isSurchargeFee)} />
                                </div>}
                                {isSurchargeFee && <div className="grid grid-cols-3 items-center gap-4">
                                    <p className='text-sm font-normal text-[#1A1A1A]'>Status:</p>
                                    <Select
                                        options={surchargeFeeStatusOptions}
                                        value={selectedSurchargeFeeStatus}
                                        onChange={(e) => setSelectedSurchargeFeeStatus(e)}
                                        className="w-full col-span-2 border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal focus:outline-0 bg-transparent rounded-md"
                                        // placeholder='eg. WiFi'
                                        classNamePrefix="select"
                                    />
                                </div>}
                            </div>                        
                    </div>
                </div>
                <div className="flex h-full w-full items-end">
                    <div className="flex gap-3 w-full justify-end pt-4 border-t border-[#1A1A1A]/2">
                        <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                        <button onClick={setPaymentInfo} disabled={amount < 1 || !selectedPaymenthMethod} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default AddPayment
