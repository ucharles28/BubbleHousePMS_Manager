'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeSlash } from 'iconsax-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

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
                                    Welcome to Mybcloud! 👋🏻
                                </p>
                                <span className='text-gray-600 text-sm font-normal leading-5'>
                                    Please sign-in to your account and start the adventure
                                </span>
                                <form className='flex flex-col space-y-3 w-full mt-6'>
                                    <div className='flex w-full'>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            role="input"
                                            className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type={passwordShown ? 'text' : 'password'}
                                                role="input"
                                                placeholder="Password"
                                                className="bg-white border-[1.3px] border-gray-300 rounded-md focus:outline-none text-sm font-normal leading-none text-gray-900 py-3 w-full pl-3 placeholder:font-normal placeholder:text-sm"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 text-gray-500 hover:text-gray-800 flex items-center pr-4 cursor-pointer"
                                                onClick={togglePasswordVisiblity}
                                            >
                                                {passwordShown ? <EyeSlash size={18} /> : <Eye size={18} />}
                                            </div>
                                        </div>
                                        <div className='flex justify-end mt-2'>
                                            <span className='text-xs text-normal text-gray-500 leading-5 hover:text-gray-800 cursor-pointer'>
                                                <Link href="/forgotpassword">
                                                    <span className='hover:text-gray-800 hover:transition-colors'>Forgot password?</span>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            role="button"
                                            type="submit"
                                            aria-label="log into my account"
                                            className="text-sm font-normal rounded leading-none text-white focus:outline-none bg-[#404040] disabled:bg-[#404040]/50 hover:disabled:text-white hover:text-gray-900 border hover:bg-yellow-500 transition-all py-3 w-full flex items-center justify-center gap-1 tracking-wide"
                                            disabled={!email || !password}
                                        >
                                            <span>Login</span>
                                        </button>
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

export default Login