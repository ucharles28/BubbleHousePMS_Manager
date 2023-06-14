'use client'
import { useState } from 'react';
import Link from 'next/link';

function VerifyOTP() {
    const [token, setToken] = useState('');

    return (
        <div className='bg-white w-full h-screen'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-screen items-center mx-auto'>

                    <div className='md:flex hidden col-span-3 bg-yellow-400 h-screen'>
                        <div className='w-full h-full bg-[url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] bg-center bg-no-repeat bg-cover'>
                            <div className='w-full h-full flex bg-gradient-to-t from-black/90 to-black/20'>
                                <div className='text-xs font-normal leading-6 text-white fixed bottom-0 left-0 w-full p-8'>
                                    <p>Copyright Mybcloud © {new Date().getFullYear()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-full md:col-span-1 bg-white h-auto m-auto md:p-0 p-4'>
                        <div className="flex justify-center items-center p-5 md:p-7 w-full h-full bg-white md:drop-shadow-none drop-shadow-md m-auto">
                            <div className="m-0">
                                <p
                                    tabIndex={0}
                                    role="heading"
                                    aria-label="Login to your account"
                                    className="text-xl font-semibold leading-8 text-gray-900 text-left"
                                >
                                    Verify OTP 🔒
                                </p>
                                <span className='text-gray-600 text-sm font-normal leading-5'>
                                Enter your email and we'll send you an OTP Code to be used to reset your password.
                                </span>
                                <form className='flex flex-col space-y-5 w-full mt-6'>
                                    <div className='flex w-full'>
                                        <input
                                            type="number"
                                            placeholder="Enter OTP Code"
                                            role="input"
                                            className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                            required
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            role="button"
                                            type="submit"
                                            aria-label="log into my account"
                                            className="text-sm font-normal rounded leading-none text-white focus:outline-none bg-[#404040] disabled:bg-[#404040]/50 hover:disabled:text-white hover:text-gray-900 border hover:bg-yellow-500 transition-all py-3 w-full flex items-center justify-center gap-1 tracking-wide"
                                            disabled={!token}
                                        >
                                            <span>Verify</span>
                                        </button>
                                        <div className='flex justify-center mt-2'>
                                            <span className='text-xs text-normal text-gray-500 leading-5 hover:text-gray-800 cursor-pointer'>
                                                <Link href="/auth/login">
                                                    <span className='hover:text-gray-800 hover:transition-colors'>Back to Login</span>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerifyOTP