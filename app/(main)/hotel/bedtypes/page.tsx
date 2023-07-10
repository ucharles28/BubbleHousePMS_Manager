"use client"
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft2, Eye } from 'iconsax-react';
import Loading from '../../loading';
import { useRouter } from 'next/navigation';
import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers';
import { Amenity } from '@/app/models/amenity';
import { BedType } from '@/app/models/bedtype';
import BedTypesTable from '@/app/components/BedTypesTable';
import CreateBedTypeDialog from '@/app/components/CreateBedTypeDialog';

async function getBedTypes(hotelId: string) {
    const res = await makeApiCall(`BedType/Hotel/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return [];
}

async function BedTypesPage() {
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const [openDialog, setOpenDialog] = useState(false);
    
    const router = useRouter()
    const { hotelId } = await getUserInfo()
    const bedTypes: BedType[] = await getBedTypes(hotelId) as BedType[]
    const goBack = () => {
        router.back()
    }


    return (
        <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
            <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
                    Bed Types
                </p>

                <div className='flex justify-end gap-2 w-full'>

                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                        <button
                            type="button"
                            onClick={handleClickOpen}
                            className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        >
                            Add New
                        </button>

                </div>
            </div>

            <CreateBedTypeDialog
            hotelId={hotelId}
                open={openDialog}
                onClose={handleClose}
                confirmationTitle="Add New Bed Type"
            />

            <Suspense fallback={<Loading />}>
                <BedTypesTable bedTypes={bedTypes} hotelId={hotelId} />
            </Suspense>

        </div>
    )
}

export default BedTypesPage;