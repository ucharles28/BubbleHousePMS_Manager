"use client"
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import { CircularProgress } from '@mui/material';
import { FAQ } from '../models/faq';
import { Amenity } from '../models/amenity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// interface DialogComponentProps {
//     open: boolean;
//     onClose: () => void;
//     confirmationTitle: string;
//     hotelId: string;
//     amenity?: Amenity
// }

// interface Option {
//     icon: string;
//     title: string;
// }

const options = [
    { icon: "wifi", title: "Wifi" },
    { icon: "car", title: "Car" },
    { icon: "tv", title: "TV" },
    { icon: "air-conditioner", title: "Air Condition" },
    { icon: "bed", title: "Bed" },
    { icon: "dumbbell", title: "Gym/Fitness" },
    { icon: "wine-glass", title: "Wine" },
    { icon: "martini-glass-empty", title: "Bar/Lounge" },
    { icon: "utensils", title: "Breakfast" },
    { icon: "utensils-slash", title: "Kitchen" },
    { icon: "fork-knife", title: "Resturant" },
    { icon: "user", title: "Staff" },
    { icon: "phone", title: "Call" },
    { icon: "car-wash", title: "Car Wash" },
    { icon: "ban-smoking", title: "Non-Smoking Room" },
    { icon: "smoking", title: "Smoking" },
    { icon: "pipe-smoking", title: "Smoking" },
    { icon: "mug-saucer", title: "Breakfast 2" },
    { icon: "spa", title: "Spa" },
    { icon: "bell-concierge", title: "Room Service" },
    { icon: "percent", title: "Discount" },
    { icon: "envelop", title: "Message" },
    { icon: "tag", title: "Discount" },
    { icon: "bowl-spoon", title: "Food" },
    { icon: "calendar-days", title: "Event" },
    { icon: "clock-eleven", title: "Time" },
    { icon: "personal-military-rifle", title: "Security 1" },
    { icon: "user-police-tie", title: "Security 2" },
    { icon: "camera-security", title: "CCTV" },
    { icon: "person-walking-luggage", title: "Luggage Storage" },
    { icon: "house", title: "House Keeping" },
    { icon: "lightbulb-exclamation", title: "Electricity" }
];

const CreateAmenitiesDialog = ({ open, onClose, confirmationTitle, hotelId, amenity }) => {
    // const [question, setQuestion] = useState(faq ? faq.question : '')
    // const [answer, setAnswer] = useState(faq ? faq.answer : '')
    useEffect(() => {
        console.log('from useEffect', amenity)
    }, [amenity])
    console.log(amenity)
    const [title, setTitle] = useState(amenity ? amenity.title : '');
    const [isLoading, setIsLoading] = useState(false)

    async function saveAmenity() {
        setIsLoading(true)
        if (amenity) {
            const req = {
                title,
                icon: ''
            }

            const response = await makeApiCall(`FAQ/${amenity.id}`, 'PUT', req)
            if (response.successful) {
                message.success('Amenity saved successfully')
            } else {
                message.error(response.data)
            }
        } else {
            const req = {
                hotelId,
                title,
                icon: ''
            }

            const response = await makeApiCall('Amenity', 'POST', req)
            if (response.successful) {
                message.success('Amenity saved successfully')
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
                className='font-poppins capitalize'
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
                            <label className='text-xs font-medium leading-6 text-gray-800'>Amenity</label>
                            <input
                                type="text"
                                // placeholder="eg. Complimentary Breakfast?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                            {/* <select
                                id="select"
                                className="py-2 px-4 border rounded-md focus:outline-none"
                            >
                                <option value="">Select...</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option.title}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        {option.title}
                                    </option>
                                ))}
                            </select> */}
                        </div>

                        {/* <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs font-medium leading-6 text-gray-800'>Answer</label>
                            <input
                                type="text"
                                placeholder="Yes we give complimentary breakfast"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                        </div> */}
                    </div>

                    <div className='flex items-center gap-3 justify-end w-full border-t border-gray-300 pt-2'>
                        <button onClick={onClose} className='p-3 text-sm font-medium text-white rounded-lg bg-[#404040] disabled:bg-[#404040]/50'>Cancel</button>
                        <button onClick={saveAmenity} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent >
        </Dialog >
    );
};

export default CreateAmenitiesDialog;
