"use client"
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import styled from '@emotion/styled';
import { ArrowLeft2, Eye, Trash } from 'iconsax-react'
import { useRouter } from 'next/navigation';

export default function RoomsTable({ rooms }: { rooms: any[] }) {
    const router = useRouter()

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

    const rows = rooms.map((room) => (
        {
            id: room.id,
            name: room.roomType.name,
            roomNumber: room.roomNumber,
            price: Number(room.roomType.price).toLocaleString(),
            date: room.createdDate,
            status: Number(room.status) === 0 ? 'Available' : 'Booked'
        }
    ))

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
                    Rooms
                </p>

                <div className='flex justify-end gap-2 w-full'>

                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                    <Link href='/hotel/rooms/new'>
                        <button
                            type="button"
                            className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        >
                            Add New
                        </button>
                    </Link>

                </div>
            </div>

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
                                <TableCell className=" ">Room Type</TableCell>
                                <TableCell className=" ">Room Number</TableCell>
                                <TableCell className=" ">Room Price</TableCell>
                                <TableCell className=" ">Status</TableCell>
                                <TableCell className="w-20">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRowStyled key={index}>
                                    <TableCell className='w-8'>{index + 1}</TableCell>
                                    <TableCell className=''>{row.name}</TableCell>
                                    <TableCell className='font-medium'>{row.roomNumber}</TableCell>
                                    <TableCell className=''>{row.price}</TableCell>
                                    <TableCell className=''>{row.status}</TableCell>
                                    <TableCell className='w-20 flex items-center gap-2'>
                                        <Link
                                            // href={`/bookings/details/${row.id}`}
                                            href='/'
                                        >
                                            <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a] cursor-pointer' />
                                        </Link>

                                        <Trash size={18} className='text-[#636363] hover:text-red-500 cursor-pointer' />

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
            </div>
        </div>
    )
}