"use client"
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import styled from '@emotion/styled';
import { Eye } from 'iconsax-react'
import { BookingResponse } from '@/app/models/bookingResponse';

export default function BookingsTable({ bookings }: { bookings: BookingResponse[] }) {

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = bookings.map((booking) => (
        {
            bookingNo: booking.code,
            bookedBy: booking.fullName,
            date: booking.dateRangeString,
            status: booking.status
        }
    ))

    const getStatusChip = (status: number) => {
        console.log(status)
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
                                    <Link href='/bookings/details'
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
    )
}