import { Buildings, Calendar, Money2, MessageEdit, People, Buliding, Eye } from 'iconsax-react';
import styled from '@emotion/styled';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, CircularProgress, TableBody, TextField } from '@mui/material';
import { IDashboard } from '../models/dashboard';

export default function Dashboard({ dashboardData }: {dashboardData: IDashboard}) {
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = [
        {
            userName: 'Chijioke Emechebe',
            phoneNumber: '0123456789',
            date: '25-10-2022',
            numberOfRooms: '02',
            status: 'checked-in'
        },
        {
            userName: 'John Doe',
            phoneNumber: '9876543210',
            date: '15-11-2022',
            numberOfRooms: '03',
            status: 'checked-out'
        },
        {
            userName: 'John Doe',
            phoneNumber: '9876543210',
            date: '15-11-2022',
            numberOfRooms: '03',
            status: 'cancelled'
        },
        {
            userName: 'Jane Smith',
            phoneNumber: '5555555555',
            date: '08-12-2022',
            numberOfRooms: '01',
            status: 'checked-in'
        },
        {
            userName: 'Chijioke Emechebe',
            phoneNumber: '0123456789',
            date: '25-10-2022',
            numberOfRooms: '02',
            status: 'checked-in'
        },
        {
            userName: 'John Doe',
            phoneNumber: '9876543210',
            date: '15-11-2022',
            numberOfRooms: '03',
            status: 'checked-out'
        },
        {
            userName: 'John Doe',
            phoneNumber: '9876543210',
            date: '15-11-2022',
            numberOfRooms: '03',
            status: 'cancelled'
        },
        {
            userName: 'Chijioke Emechebe',
            phoneNumber: '0123456789',
            date: '25-10-2022',
            numberOfRooms: '02',
            status: 'checked-in'
        },
        {
            userName: 'John Doe',
            phoneNumber: '9876543210',
            date: '15-11-2022',
            numberOfRooms: '03',
            status: 'checked-out'
        },
    ];

    const getStatusChip = (status: string) => {
        let chipColor = '';
        let chipText = '';

        switch (status) {
            case 'checked-in':
                chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
                chipText = 'Checked-in';
                break;
            case 'checked-out':
                chipColor = 'bg-[#EDEDED] text-[#636363]';
                chipText = 'Checked-out';
                break;
            case 'cancelled':
                chipColor = 'bg-[#FFF1F1] text-[#FF4C51]';
                chipText = 'Cancelled';
                break;
            default:
                chipColor = 'bg-[#F9FAFC] text-[#6366F1]';
                chipText = status;
        }

        return (
            <span className={`text-xs mx-auto text-center font-medium rounded-full p-2 px-3 leading-6 ${chipColor}`}>
                {chipText}
            </span>
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

    const dashboardCards = [
        {
            title: 'Staffs',
            url: '/staffs',
            icon: People,
            value: dashboardData.numberOfStaffs
        },
        {
            title: 'Total Rooms',
            url: '/hotels',
            icon: Buildings,
            value: dashboardData.totalRooms
        },
        {
            title: 'Available Rooms',
            url: '/bookings',
            icon: Buliding,
            value: dashboardData.availableRooms
        },
        {
            title: 'Booking Request',
            url: '/bookings',
            icon: MessageEdit,
            value: dashboardData.bookingRequest
        },
        {
            title: 'Running Booking',
            url: '/bookings',
            icon: Calendar,
            value: dashboardData.runningBookings
        },
        {
            title: 'Total Payment',
            url: '/bookings',
            icon: Money2,
            value: dashboardData.totalPayment
        }
    ]

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 w-full h-auto items-center gap-x-5 md:gap-x-10 gap-y-6'>

                {dashboardCards.map(({ url, title, icon: Icon, value }) => (
                    <Link href={url} key={url}>
                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Icon size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 font-medium text-[#636363]'>{title}</p>
                                <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{value}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

            <div className='flex flex-col w-full gap-3'>
                <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
                    Recent activities
                </p>
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
                                    <TableCell className=" ">Phone</TableCell>
                                    <TableCell className=" ">Date</TableCell>
                                    <TableCell className=" ">No. of rooms</TableCell>
                                    <TableCell className=" ">Status</TableCell>
                                    <TableCell className="w-16 md:w-20">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRowStyled key={index}>
                                        <TableCell>{row.userName}</TableCell>
                                        <TableCell>{row.phoneNumber}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.numberOfRooms}</TableCell>
                                        <TableCell>{getStatusChip(row.status)}</TableCell>
                                        <TableCell className='w-16 md:w-20'>
                                            <Link href='/'
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
        </>
    )
}