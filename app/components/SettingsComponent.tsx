'use client'
import { useState } from "react"
import { makeApiCall } from "../helpers/apiRequest"
import { message } from "antd"
import { CircularProgress } from "@mui/material"

export default function SettingsComponent({ user }: { user: any }) {
  // const [userImageFile, setUserImageFile] = useState<File | null>(null);
  // const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const [firstName, setFirstName] = useState(user ? user.fullName.split(' ')[0] : '')
  const [lastName, setLastName] = useState(user ? user.fullName.split(' ')[1] : '')
  const [email, setEmail] = useState(user ? user.email : '')
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '')
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // const handleClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  // const handleFileChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setUserImageFile(e.target.files[0]);

  //     const reader = new FileReader();
  //     reader.onload = function (event) {
  //       if (event.target) {
  //         setUserImageSrc(event.target.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  async function handleUpdateProfile() {
    setIsLoading(true)
    const request = {
      firstName,
      lastName,
      phoneNumber,
      email,
      userId: user.id
    }

    const response = await makeApiCall('User/UpdateStaffProfile', 'POST', request)
    if (response.successful) {
      message.success('Profile updated successfully')
    } else {
      message.error(response.data)
    }
    setIsLoading(false)
  }

  async function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      message.error('Your new password and confirm password don\'t match, kindly try again')
      return
    }
    if (newPassword.length < 8) {
      message.error('Your password should be at least 8 characters long')
      return
    }

    setIsPasswordLoading(true)
    const request = {
      newPassword,
      oldPassword,
      userId: user.id
    }

    const response = await makeApiCall('User/ChangePassword', 'POST', request)
    if (response.successful) {
      message.success('Password updated successfully')
    } else {
      message.error(response.data)
    }
    setIsPasswordLoading(false)
  }
  return (
    <div className='min-h-screen w-full py-6 flex flex-col gap-6'>
      <div className='flex flex-col items-end gap-y-2 md:flex-row w-full'>
        <p className='block w-full text-xl font-medium text-[#1A1A1A] leading-6'>
          Settings
        </p>
      </div>

      <div className='bg-white border border-[#E4E4E4] p-4 py-5 rounded-lg w-full overflow-auto h-auto'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <p className='text-base font-medium leading-6 text-gray-800'>
              Personal Information
            </p>
          </div>

          <div className='md:col-span-2'>
            {/* <div className='space-y-1 my-3'>
              <div className='flex items-center space-x-4'>
                <span className='inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100'>
                  {!userImageSrc ? (
                    <svg
                      className='h-full w-full text-gray-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                  ) : (
                    <img
                      className='w-full h-full object-cover'
                      accept='image/*'
                      src={userImageSrc}
                      alt='User Profile'
                    />
                  )}
                </span>

                <input
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type='file'
                  onChange={handleFileChange}
                />

                <button
                  type='button'
                  onClick={handleClick}
                  className='rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div> */}

            <div className="space-y-3">

              <div className="space-y-1">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="text-xs font-medium leading-5 text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last-name" className="text-xs font-medium leading-5 text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="Confirm password" className="text-xs font-medium leading-5 text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="email"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="Confirm password" className="text-xs font-medium leading-5 text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-end w-full">
                <button
                  type="submit"
                  onClick={handleUpdateProfile}
                  disabled={!firstName || !lastName || !email || !phoneNumber}
                  className="inline-flex justify-center rounded-md bg-yellow-500 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-[#f1ce40] focus:outline-0"
                >
                  {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
                </button>
              </div>

            </div>
          </div>

        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">

          <div className="md:col-span-1">
            <p className="text-base font-medium leading-6 text-gray-800">Change Password</p>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-3">

              <div className="space-y-1">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="old-password" className="text-xs font-medium leading-5 text-gray-700">
                      Old password
                    </label>
                    <input
                      type="password"
                      name="old-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      id="old-password"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="new-password" className="text-xs font-medium leading-5 text-gray-700">
                      New password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      id="new-password"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="confirm-password" className="text-xs font-medium leading-5 text-gray-700">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="confirm-password"
                      className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                    />
                  </div>
                </div>

              </div>

              <div className="flex justify-end w-full">
                <button
                  type="button"
                  disabled={!newPassword || !oldPassword || !confirmPassword}
                  onClick={handleChangePassword}
                  className="inline-flex justify-center rounded-md bg-yellow-500 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-[#f1ce40] focus:outline-0"
                >
                  {isPasswordLoading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}