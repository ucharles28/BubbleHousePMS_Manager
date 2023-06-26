'use client'
import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TableCell, TablePagination, TableRow, Table, TableContainer, TableHead, CircularProgress, TableBody, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { ArrowLeft2, Eye } from 'iconsax-react'

function Staffs() {
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
      role: 'Staff',
      email: 'chijiokeemechebe@gmail.com',
      status: 'active',
      date: '2023-06-15'
    },
    {
      userName: 'John Doe',
      role: 'Staff',
      email: 'johndoe@gmail.com',
      status: 'banned',
      date: '2023-06-09'
    },
    {
      userName: 'Jane Smith',
      role: 'Staff',
      email: 'janesmith@gmail.com',
      status: 'active',
      date: '2023-06-22'
    },
  ];

  const getStatusChip = (status: string) => {
    let chipColor = '';
    let chipText = '';

    switch (status) {
      case 'active':
        chipColor = 'bg-[#EAF5EA] text-[#56CA00]';
        chipText = 'Active';
        break;
      case 'banned':
        chipColor = 'bg-[#FFF1F1] text-[#FF4C51]';
        chipText = 'Banned';
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
          Staffs
        </p>

        <div className='flex justify-end gap-2 w-full'>

          <input
            type='text'
            // onChange={(e) => handleSearch(e.target.value)}
            placeholder='eg. Daniel'
            className='w-1/2 h-9 border-[1.2px] border-gray-300 text-sm font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
          />
          <Link href='/staffs/new'>
            <button
              type="button"
              className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
            >
              Add Staff
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
    </div>
  )
}

export default Staffs