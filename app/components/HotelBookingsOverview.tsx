import Link from 'next/link';
import { Buildings, Calendar, Money2, MessageEdit, Notepad2, Slash, CalendarTick } from 'iconsax-react';
import { BookingsOverview } from '../models/bookingsOverview';

export default function HotelBookingsOverview({ bookingsOverview }: { bookingsOverview: BookingsOverview }) {
    const dashboardCards = [
        { key: 1, title: 'Today Booked', url: '/bookings/running', icon: Notepad2, value: bookingsOverview.todayBooked },
        { key: 2, title: 'Running Bookings', url: '/bookings/running', icon: Calendar, value: bookingsOverview.runningBookings },
        { key: 3, title: 'Booking Request', url: '/bookings/pending', icon: MessageEdit, value: bookingsOverview.bookingRequest },
        { key: 4, title: 'Available Rooms', url: '/staffs', icon: Buildings, value: bookingsOverview.availableRooms },
        { key: 5, title: 'Cancelled Bookings', url: '/bookings/cancelled', icon: Slash, value: bookingsOverview.cancelledBookings },
        { key: 6, title: 'Total Bookings', url: '/bookings/all', icon: CalendarTick, value: bookingsOverview.totalBookings },
        { key: 7, title: 'Total Payments', url: '#', icon: Money2, value: bookingsOverview.totalPayment },
    ]

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

            {dashboardCards.map(({ key, url, title, icon: Icon, value }) => (
                <Link href={url} key={key}>
                    <div className="box rounded-2xl bg-white  border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                        <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                            <Icon size={24} className='text-[#636363]' variant='Bold' />
                        </div>
                        <div className='block text-center md:text-left gap-3'>
                            <p className='text-sm leading-6 font-medium text-[#636363]'>{title}</p>
                            <p className='text-xl md:text-2xl leading-10 font-semibold text-[#1a1a1a]'>{value}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    )
}