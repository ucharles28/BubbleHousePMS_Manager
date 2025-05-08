'use client'
import React, { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps, message } from 'antd';
import dayjs from 'dayjs';
import { makeApiCall } from '../helpers/apiRequest';
import { Audit } from '../models/audit';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, TableBody, TextField, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import Loading from '../(main)/loading';

const Audits = ({hotelId} : {hotelId: string}) => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    const [audits, setAudits] = useState<Audit[]>([]);
    const [date, setDate] = React.useState(new Date());
    const [isLoading, setIsLoading] = useState(true)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchAudits()
    }, [date])

    const TableRowStyled = styled(TableRow)`
                &:nth-of-type(odd) {
                    background-color: #f8f8f8;
                }
                & > td {
                    color: #636363;
                    font-size: 0.75rem;
                }
            `;

    async function fetchAudits() {
        setIsLoading(true)
        const req = {
            hotelId,
            date
        }
        const response = await makeApiCall(`Audit/GetAudits`, 'POST', req);

        if (response.successful) {
            setAudits(response.data as Audit[])
        }

        setIsLoading(false)
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(new Date(String(dateString)));
    };

    async function handleRunAuditClick(){
        setIsButtonLoading(true)
        const response = await makeApiCall('Audit', 'POST', hotelId);
        if (response.successful) {
            message.success("System audit completed!")
            setDate(new Date())
        } else {
            message.error(response.data)
        }
        setIsButtonLoading(false)
    }

  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-y-1 w-full'>
                <p className='block md:w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                  System Audits
                </p>
        
                <div className="w-full flex justify-end">
                    <button
                    onClick={handleRunAuditClick}
                    className="p-3 text-xs font-medium text-gray-900 rounded-lg bg-yellow-500">
                    {isButtonLoading ? <CircularProgress size={20} color="inherit" /> : 'Run Audit'}
                    </button>
                </div>
        </div>
        <div className='flex items-center justify-between gap-y-1 w-full'>
                <p className='block md:w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                <DatePicker
                                className='col-span-2'
                                format={{
                                    format: 'YYYY-MM-DD',
                                    type: 'mask',
                                }}
                                getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode as HTMLElement;
                                }}
                                maxDate={dayjs(new Date())}
                                value={dayjs(date)}
                                onChange={onChange} 
                                />
                </p>
    
                <div
                //   onClick={goBack}
                  className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                  <span className="text-xs font-medium leading-6">Export</span>
                </div>
        </div>

        {!isLoading 
        ? <div className='bg-white border border-gray-50 drop-shadow-sm rounded-lg w-full h-auto p-1'>
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
                                    <TableCell className=" ">Guest Name</TableCell>
                                    <TableCell className=" ">Tier</TableCell>
                                    <TableCell className=" ">Room Type</TableCell>
                                    <TableCell className=" ">Room No.</TableCell>
                                    <TableCell className="w-20">Room Rate Total</TableCell>
                                    <TableCell className="w-20">Due Out</TableCell>
                                    <TableCell className="w-20">Balance Due(-/+)</TableCell>
                                    <TableCell className="w-20">Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {audits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((audit: Audit, index: number) => (
                                    <TableRowStyled key={index}>
                                        <TableCell>{audit.fullName}</TableCell>
                                        <TableCell>{audit.bookingType}</TableCell>
                                        <TableCell>{audit.roomTypes}</TableCell>
                                        <TableCell>{audit.roomNumbers}</TableCell>
                                        <TableCell>{audit.totalRoomPrice}</TableCell>
                                        <TableCell>{audit.checkout}</TableCell>
                                        <TableCell>{audit.balance}</TableCell>
                                        <TableCell>{audit.notes}</TableCell>
                                    </TableRowStyled>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={audits.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
        </div> 
        : <Loading />}
    </div>
  )
}

export default Audits
