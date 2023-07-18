'use client'
import { DirectNotification } from "iconsax-react";
import { Notification } from "../models/notification";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Notifications({notifications}: {notifications: Notification[]}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const handleOpenNotification = (notification: Notification) => {
        setSelectedNotification(notification);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div className='w-full h-full py-6 flex flex-col gap-4'>

            <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
                Notifications
            </p>

            <div className='w-full h-auto flex flex-col items-center gap-3'>

                {notifications.map((notification) => (<div className='cursor-pointer bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'
                    onClick={() => handleOpenNotification(notification)}
                >
                    <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                        <DirectNotification className="h-4 w-4 text-green-600" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='text-sm text-[#1a1a1a]/80 text-justify hover:text-[#D4AA00] truncate md:w-3/5 w-3/4 font-medium leading-6'>{notification.body}</p>
                        <p className='text-xs text-[#636363]'>{format(new Date(notification.createdDate), 'dd MMMM yyyy - HH:mm')}</p>
                    </div>
                </div>))}

                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle
                        className='font-poppins'
                        sx={{
                            padding: "16px",
                            fontSize: "1rem",
                            letterSpacing: "0rem",
                            fontWeight: "600",
                            width: "auto",
                            color: "#364a63",
                        }}
                    >
                        {selectedNotification?.title}
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            padding: "16px",
                        }}
                        className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'
                    >
                        <DialogContentText className='text-sm font-normal leading-5 text-gray-600'>
                            {selectedNotification?.body}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

            </div>

        </div>
    )
}