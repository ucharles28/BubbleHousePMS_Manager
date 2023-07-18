"use client"
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogComponentProps {
    open: boolean;
    onClose: () => void;
    onDelete: (index: number) => Promise<void>;
    confirmationType: string;
    index: number;
}

const DeleteDialog: React.FC<DialogComponentProps> = ({ open, onClose, confirmationType, onDelete, index }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth={true}
        >
            <DialogTitle
                className='font-poppins'
                sx={{
                    padding: '16px',
                    fontSize: '1rem',
                    letterSpacing: '0rem',
                    fontWeight: '600',
                    color: '#364a63',
                }}
            >
                Confirmation alert
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: '16px',
                    textAlign: 'justify',
                }}
                className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full w-full'
            >
                <DialogContentText className='flex flex-col gap-5 w-full'>
                    <span className='text-sm font-normal leading-5 text-gray-600'>
                        Are you sure you want to delete this {confirmationType}?
                    </span>

                    <div className='flex items-center gap-3 justify-end w-full border-t border-gray-300 pt-2'>
                        <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>No</button>
                        <button onClick={() => onDelete(index)} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>Yes</button>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
