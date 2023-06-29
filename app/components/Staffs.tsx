'use client'
import { useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, CircularProgress, TableBody, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { Eye } from 'iconsax-react'
import { StaffResponse } from '../models/staffResponse';
import { format } from 'date-fns';

export default function Staffs({ staffs }: { staffs: StaffResponse[] }) {
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = staffs.map((staff) => (
        {
            userName: staff.fullName,
            role: 'Staff', //staff.accountType
            email: staff.email,
            status: staff.accountStatus,
            date: format(new Date(staff.createdDate), 'yyyy-dd-MM')//'2023-06-15'
        }
    ))

    //   const rows = [
    //     {
    //       userName: ,
    //       role: 'Staff',
    //       email: 'chijiokeemechebe@gmail.com',
    //       status: 'active',
    //       date: '2023-06-15'
    //     },
    //     {
    //       userName: 'John Doe',
    //       role: 'Staff',
    //       email: 'johndoe@gmail.com',
    //       status: 'banned',
    //       date: '2023-06-09'
    //     },
    //     {
    //       userName: 'Jane Smith',
    //       role: 'Staff',
    //       email: 'janesmith@gmail.com',
    //       status: 'active',
    //       date: '2023-06-22'
    //     },
    //   ];

    const getStatusChip = (status: number) => {
        let chipColor = '';
        let chipText = '';

        switch (status) {
            case 0:
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Active';
                break;
            case 1:
                chipColor = 'bg-[#FFF1F1] text-[#FF4C51]';
                chipText = 'Deactivated';
                break;
            default:
                chipColor = 'bg-[#F9FAFC] text-[#6366F1]';
                chipText = 'Active';
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
                            <TableCell className=" ">Name</TableCell>
                            <TableCell className=" ">Role</TableCell>
                            <TableCell className=" ">Email</TableCell>
                            <TableCell className=" ">Status</TableCell>
                            <TableCell className="w-20">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRowStyled key={index}>
                                <TableCell>{row.userName}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{getStatusChip(row.status)}</TableCell>
                                <TableCell className='w-20'>
                                    <Link href='/staffs/details'
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