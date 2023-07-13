"use client"
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import styled from '@emotion/styled';
import { Eye, ArrowLeft2 } from 'iconsax-react'
import { BookingResponse } from '@/app/models/bookingResponse';
import { useRouter } from 'next/navigation';

export default function BookingsTable({ bookings, title }: { bookings: BookingResponse[], title: string }) {
    const router = useRouter()

    const goBack = () => {
        router.back()
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = bookings.map((booking) => (
        {
            id: booking.id,
            bookingNo: booking.code,
            bookedBy: booking.fullName,
            date: booking.dateRangeString,
            status: booking.status
        }
    ))

    const getStatusChip = (status: number) => {
        let chipColor = '';
        let chipText = '';

        switch (status) {
            case 0:
                chipColor = 'bg-[#EDEDED] text-[#636363]';
                chipText = 'Pending';
                break;
            case 1:
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Running';
                break;
            case 2:
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Completed';
                break;
            case 3:
                chipColor = 'bg-[#FFF1F1] text-[#FF4C51]';
                chipText = 'Cancelled';
                break;
            case 4:
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Confirmed';
                break;
            default:
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Pending';
        }

        return (
            <span className={`text-xs mx-auto text-center font-medium rounded-full p-2 px-3 leading-6 ${chipColor}`}>
                {chipText}
            </span>
        );
    };

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
                    {title}
                </p>

                <div className='flex justify-end gap-2 w-full'>

                    {/* <input
            type='text'
            placeholder='eg. Daniel'
            className='w-1/2 h-9 border-[1.2px] border-gray-300 text-sm font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
          /> */}
                    <div
                        onClick={goBack}
                        className="px-2 py-1.5 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-500 hover:text-gray-800">
                        <ArrowLeft2 size={14} />
                        <span className="text-xs font-medium leading-6">Back</span>
                    </div>
                    <Link href='/bookings'>
                        <button
                            type="button"
                            className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-lg text-xs text-center px-2.5 py-1.5"
                        >
                            Book room
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
                                <TableCell className="w-8">id</TableCell>
                                <TableCell className=" ">Booking Number</TableCell>
                                <TableCell className=" ">Booked By</TableCell>
                                <TableCell className=" ">Date</TableCell>
                                <TableCell className=" ">Status</TableCell>
                                <TableCell className="w-20">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRowStyled key={index}>
                                    <TableCell className='w-8'>{index + 1}</TableCell>
                                    <TableCell className='text-[0.875rem]'>{row.bookingNo}</TableCell>
                                    <TableCell className='font-medium'>{row.bookedBy}</TableCell>
                                    <TableCell className='tracking-wider'>{row.date}</TableCell>
                                    <TableCell>{getStatusChip(row.status)}</TableCell>
                                    <TableCell className='w-20'>
                                        <Link href={`/bookings/details/${row.id}`}
                                        >
                                            <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a]' />
                                        </Link>

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