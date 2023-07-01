import { AvailableRoom } from "../models/availableRoom"

export default function AvailableRooms({ availableRooms }: {availableRooms: AvailableRoom[]}) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

            {availableRooms.map(({ id,  roomNumber, roomType }) => (
                <div key={id} className="box rounded-2xl bg-[#FFF]  border border-[#E4E4E4] flex justify-center flex-col items-center md:items-center p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                    <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                        {roomNumber}
                    </div>
                    <p className='text-sm leading-6 font-medium text-[#636363]'>Room Type: {roomType}</p>
                </div>
            ))}

        </div>
    )
}