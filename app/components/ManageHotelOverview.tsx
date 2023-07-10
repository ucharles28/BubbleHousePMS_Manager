'use client'
import Link from 'next/link';
import { Buildings, Calendar, Money2, MessageEdit, Notepad2, Slash, CalendarTick } from 'iconsax-react';
import { useRouter } from 'next/navigation';

export default function ManageHotelOverview() {
    const router = useRouter()
    const dashboardCards = [
        { key: 1, title: 'Hotel details', url: '/hotel/details' },
        { key: 2, title: 'FAQ', url: '/hotel/faqs' },
        { key: 3, title: 'Room types', url: '/hotel/room-types' },
        { key: 4, title: 'Bed types', url: '/hotel/bedtypes' },
        { key: 5, title: 'Rooms', url: '/hotel/rooms' },
        { key: 6, title: 'Amenities', url: '/hotel/amenities' },
        { key: 7, title: 'Complements', url: '/hotel/complements' },
    ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

            {dashboardCards.map(({ key, url, title }) => (
                // <Link href={url} key={key}>
                    <div key={key} onClick={() => router.push(url)} className="box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-start  p-6 h-auto">
                        <p className='text-sm leading-6 font-medium text-[#636363] mb-[0]'>{title}</p>
                    </div>
                // </Link>
            ))}

        </div>
    )
}