"use client"
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogComponentProps {
    open: boolean;
    onClose: () => void;
    confirmationTitle: string;
}

const CreateDialog: React.FC<DialogComponentProps> = ({ open, onClose, confirmationTitle }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                className='font-poppins'
                sx={{
                    padding: '16px',
                    fontSize: '1rem',
                    letterSpacing: '0rem',
                    fontWeight: '600',
                    width: 'auto',
                    color: '#364a63',
                }}
            >
                {confirmationTitle}
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: '16px',
                    textAlign: 'justify',
                }}
                className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'
            >
                <DialogContentText className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs font-medium leading-6 text-gray-800'>Question</label>
                            <input
                                type="email"
                                placeholder="eg. Complimentary Breakfast?"
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                        </div>

                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs font-medium leading-6 text-gray-800'>Answer</label>
                            <input
                                type="email"
                                placeholder="Yes we give complimentary breakfast"
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-3 justify-end w-full border-t border-gray-300 pt-2'>
                        <button className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                        <button className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>Submit</button>
                    </div>
                </DialogContentText>
            </DialogContent >
        </Dialog >
    );
};

export default CreateDialog;
