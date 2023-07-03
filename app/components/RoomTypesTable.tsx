"use client"
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import styled from '@emotion/styled';
import { Eye, Trash } from 'iconsax-react'
import { BookingResponse } from '@/app/models/bookingResponse';

export default function RoomTypesTable() {
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const rows = bookings.map((booking) => (
    //     {
    //         id: booking.id,
    //         roomName: booking.code,
    //         roomPrice: booking.code,
    //         numberofRooms: booking.code,
    //         adult: booking.fullName,
    //         children: booking.dateRangeString
    //     }
    // ))

    const row = [
        {
            id: 1,
            roomName: 'Staffs',
            roomPrice: '45,000',
            numberofRooms: '10',
            adult: '10',
            chiildren: '10',
        },
    ]

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
                            <TableCell className=" ">Room Name</TableCell>
                            <TableCell className=" ">Room Price</TableCell>
                            <TableCell className=" ">Number of rooms</TableCell>
                            <TableCell className=" ">Adult</TableCell>
                            <TableCell className=" ">Children</TableCell>
                            <TableCell className="w-20">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRowStyled key={index}>
                                <TableCell className='w-8'>{index + 1}</TableCell>
                                <TableCell className=''>{row.roomName}</TableCell>
                                <TableCell className='font-medium'>{row.roomPrice}</TableCell>
                                <TableCell className=''>{row.numberofRooms}</TableCell>
                                <TableCell className=''>{row.adult}</TableCell>
                                <TableCell className=''>{row.children}</TableCell>
                                <TableCell className='w-20'>
                                    <Link
                                        // href={`/bookings/details/${row.id}`}
                                        href='/'
                                    >
                                        <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a]' />
                                    </Link>

                                    <Trash size={18} className='text-[#636363] hover:text-red-500' />

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