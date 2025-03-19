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
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWifi, faCar, faTv, faBed, faDumbbell, faWineGlass, faMartiniGlassEmpty, faUtensils, faUser, faPhone, faBanSmoking, faSmoking,
    faMugSaucer, faSpa, faBellConcierge, faPercent, faEnvelopeOpen, faTag,
    faCalendarDays, faHouse, faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import fontAwesome from '../lib/font-awesome.json';
import { library } from "@fortawesome/fontawesome-svg-core";

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

library.add(faWifi, faCar, faTv, faBed, faDumbbell, faWineGlass, faMartiniGlassEmpty, faUtensils, faUser, faPhone, faBanSmoking, faSmoking, faMugSaucer, faSpa, faBellConcierge, faPercent, faEnvelopeOpen, faTag, faCalendarDays, faHouse, faLightbulb)

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

const iconOptions = [
    // { value: "home", label: <><FontAwesomeIcon icon={"fas fa-yen-sign"} /> Home</> },
    { value: "wifi", label: <><FontAwesomeIcon icon={"wifi"} /> Wifi</> },
    { value: "car", label: <><FontAwesomeIcon icon={"car"} /> Car</> },
    { value: "tv", label: <><FontAwesomeIcon icon={"tv"} /> TV</> },
    // { icon: "air-conditioner", title: "Air Condition" },
    { value: "bed", label: <><FontAwesomeIcon icon={"bed"} /> Bed</> },
    { value: "dumbbell", label: <><FontAwesomeIcon icon={"dumbbell"} /> Gym/Fitness</> },
    { value: "wine-glass", label: <><FontAwesomeIcon icon={"wine-glass"} /> Wine</> },
    { value: "martini-glass-empty", label: <><FontAwesomeIcon icon={"wine-glass"} />Bar/Lounge</> },
    { value: "utensils", label: <><FontAwesomeIcon icon={"wine-glass"} />Breakfast</> },
    // { icon: "utensils-slash", title: "Kitchen" },
    // { icon: "fork-knife", title: "Resturant" },
    { value: "user", label: <><FontAwesomeIcon icon={"user"} />Staff</> },
    { value: "phone", label: <><FontAwesomeIcon icon={"phone"} />Call</> },
    // { icon: "car-wash", title: "Car Wash" },
    { value: "ban-smoking", label: <><FontAwesomeIcon icon={"ban-smoking"} />Non-Smoking Room</> },
    { value: "smoking", label: <><FontAwesomeIcon icon={"smoking"} />Non-Smoking</> },
    // { icon: "pipe-smoking", title: "Smoking" },
    { value: "mug-saucer", label: <><FontAwesomeIcon icon={"mug-saucer"} />Breakfast 2</> },
    { value: "spa", label: <><FontAwesomeIcon icon={"spa"} />Spa</> },
    { value: "bell-concierge", label: <><FontAwesomeIcon icon={"bell-concierge"} />Room Service</> },
    { value: "percent", label: <><FontAwesomeIcon icon={"percent"} />Discount</> },
    { value: "envelope-open", label: <><FontAwesomeIcon icon={"envelope-open"} />Message</> },
    { value: "tag", label: <><FontAwesomeIcon icon={"tag"} />Discount</> },
    // { icon: "bowl-spoon", title: "Food" },
    { value: "calendar-days", label: <><FontAwesomeIcon icon={"calendar-days"} />Event</> },
    // { icon: "clock-eleven", title: "Time" },
    // { icon: "personal-military-rifle", title: "Security 1" },
    // { icon: "user-police-tie", title: "Security 2" },
    // { icon: "camera-security", title: "CCTV" },
    // { icon: "person-walking-luggage", title: "Luggage Storage" },
    { value: "house", label: <><FontAwesomeIcon icon={"house"} />House Keeping</> },
    { value: "lightbulb", label: <><FontAwesomeIcon icon={"lightbulb"} />Electricity</> },
    // { icon: "lightbulb-exclamation", title: "Electricity" }
];

const CreateAmenitiesDialog = ({ open, onClose, confirmationTitle, hotelId, amenity }) => {
    
    // const [question, setQuestion] = useState(faq ? faq.question : '')
    const [selectedOption, setSelectedOption] = useState(null)
    useEffect(() => {
        console.log('from useEffect', amenity)
        if (amenity) {
            setTitle(amenity.title)
            setSelectedOption(iconOptions.find((option) => option.value === amenity.icon))
        }
    }, [amenity])
    const [title, setTitle] = useState(amenity ? amenity.title : '');
    const [isLoading, setIsLoading] = useState(false)

    async function saveAmenity() {
        setIsLoading(true)
        if (amenity) {
            const req = {
                title,
                icon: selectedOption.value
            }

            const response = await makeApiCall(`Amenity/${amenity.id}`, 'PUT', req)
            if (response.successful) {
                message.success('Amenity saved successfully')
            } else {
                message.error(response.data)
            }
        } else {
            const req = {
                hotelId,
                title,
                icon: selectedOption.value
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

    function handleChange(e) {
        setSelectedOption(e)
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
                    <div className='flex flex-col gap-3 w-full pb-[300px]'>
                        <div className='flex flex-col gap-3 w-full'>
                            <div className='flex flex-col gap-1'>
                            <label className='text-xs font-medium leading-6 text-gray-800'>Amenity</label>
                            <input
                                type="text"
                                // placeholder="eg. Complimentary Breakfast?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                role="input"
                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                            />
                            </div>
                            {/* <select
                                id="select"
                                className="py-2 px-4 border rounded-md focus:outline-none"
                            >
                                <option value="">Select...</option>
                                {fontAwesome.map((option, index) => (
                                    <option key={index} value={option}>
                                        <FontAwesomeIcon icon="fas fa-yen-sign" />
                                        {option.title}
                                        <i class={`fas fa-address-book`}></i>
                                    </option>
                                ))}
                            </select> */}
                            <div className='flex flex-col'>
                                <label className='text-xs font-medium leading-6 text-gray-800'>Icons</label>
                                <Select
                                    options={iconOptions}
                                    onChange={handleChange}
                                    value={selectedOption}
                                    placeholder="Select an icon..."
                                />
                            </div>
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
                        <button disabled={!selectedOption || !title} onClick={saveAmenity} className='p-3 text-sm font-medium text-gray-900 rounded-lg bg-yellow-500'>
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                        </button>
                    </div>
                </DialogContentText>
            </DialogContent >
        </Dialog >
    );
};

export default CreateAmenitiesDialog;
