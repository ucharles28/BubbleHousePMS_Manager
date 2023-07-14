"use client"
import { useState } from 'react';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import styled from '@emotion/styled';
import { ArrowLeft2, Eye, Trash } from 'iconsax-react'
import { BedType } from '../models/bedtype';
import CreateBedTypeDialog from './CreateBedTypeDialog';
import { makeApiCall } from '../helpers/apiRequest';
import { message } from 'antd';
import DeleteDialog from './DeleteDialog';
import { useRouter } from 'next/navigation';

export default function BedTypesTable({ bedTypes, hotelId }: { bedTypes: BedType[], hotelId: string }) {
    const router = useRouter()

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const goBack = () => {
        router.back()
    }

    const rows = bedTypes.map((bedType) => (
        {
            id: bedType.id,
            name: bedType.name,
            date: bedType.createdDate,
        }
    ))
    const handleClickOpenDel = (index: number) => {
        setIndex(index)
        setOpenDelDialog(true);
    };

    const handleCloseDel = () => {
        setOpenDelDialog(false);
        setOpenUpdateDialog(false);
    };

    const handleClickOpenUpdate = (index: number) => {
        setBedType(bedTypes[index])
        setOpenUpdateDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    async function deleteBedType(index: number) {
        const complement = bedTypes[index]
        const response = await makeApiCall(`BedType/${complement.id}`, 'DELETE')

        if (response.successful) {
            message.success('Bed type delete successfully')
        }
        else {
            message.error(response.data)
        }
    }

    const [bedType, setBedType] = useState<BedType | undefined>()
    const [index, setIndex] = useState(0)
    const [openDelDialog, setOpenDelDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const TableRowStyled = styled(TableRow)`
          &:nth-of-type(odd) {
              background-color: #f8f8f8;
          }
          & > td {
              color: #636363;
              font-size: 0.75rem;
          }
      `;

    const sortedRows = [...rows].sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-')).getTime();
        const dateB = new Date(b.date.split('-').reverse().join('-')).getTime();
        return dateB - dateA;
    });

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

            <div className='bg-white border border-gray-50 drop-shadow-sm rounded-lg w-full h-auto p-1'>
                <TableContainer>
                    <Table >
                        <TableHead>
                            <TableRow
                                sx={{
                                    color: "#1A1A1A",
                                    "& th": {
                                        fontSize: "0.75rem",
                                        fontWeight: "550",
                                        letterSpacing: "0.20px"
                                    }
                                }}
                                className='text-xs leading-6 font-[600] uppercase text-[#1a1a1a]'
                            >
                                <TableCell className="w-8">Id</TableCell>
                                <TableCell className=" ">Bed Type</TableCell>
                                <TableCell className="w-20">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRowStyled key={index}>
                                    <TableCell className='w-8'>{index + 1}</TableCell>
                                    <TableCell className=''>{row.name}</TableCell>
                                    <TableCell className='w-20'>

                                        <Eye onClick={() => handleClickOpenUpdate(index)} size={18} className='text-[#636363] hover:text-[#1a1a1a]' />

                                        <Trash onClick={() => handleClickOpenDel(index)} size={18} className='text-[#636363] hover:text-red-500' />

                                    </TableCell>
                                </TableRowStyled>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <DeleteDialog
                    open={openDelDialog}
                    onClose={handleCloseDel}
                    confirmationType="Bed Type"
                    index={index}
                    onDelete={deleteBedType}
                />

                <CreateBedTypeDialog
                    hotelId={hotelId}
                    open={openUpdateDialog}
                    onClose={handleClose}
                    bedType={bedType}
                    confirmationTitle="Update Bed Type"
                />
            </div>
        </div>
    )
}