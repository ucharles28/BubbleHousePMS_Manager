"use client"
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import { CircularProgress } from '@mui/material';
import { Complement } from '../models/complement';

interface DialogComponentProps {
    open: boolean;
    onClose: () => void;
    confirmationTitle: string;
    hotelId: string;
    complement?: Complement
}

const CreateComplementDialog: React.FC<DialogComponentProps> = ({ open, onClose, confirmationTitle, hotelId, complement }) => {
    const [title, setTitle] = useState(complement ? complement.title : '')
    const [isLoading, setIsLoading] = useState(false)

    async function saveComplement() {
        setIsLoading(true)
        if (complement) {
            const req = {
                title
            }

            const response = await makeApiCall(`Complement/${complement.id}`, 'PUT', req)
            if (response.successful) {
                message.success('Complement saved successfully')
            } else {
                message.error(response.data)
            }
        } else {
            const req = {
                hotelId,
                title
            }

            const response = await makeApiCall('Complement', 'POST', req)
            if (response.successful) {
                message.success('Complement saved successfully')
            } else {
                message.error(response.data)
            }
        }
        setIsLoading(false)
    }
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
                {confirmationTitle}
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: '16px',
                    textAlign: 'justify',
                }}
                className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full w-full'
            >
                <DialogContentText className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs font-medium leading-6 text-gray-800'>Title</label>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-3 justify-end w-full border-t border-gray-300 pt-2'>
                        <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                        <button onClick={saveComplement} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent >
        </Dialog >
    );
};

export default CreateComplementDialog;
