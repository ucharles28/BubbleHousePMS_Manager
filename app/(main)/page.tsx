import { Suspense } from "react"
import { makeApiCall } from "../helpers/apiRequest"
import { IDashboard } from "../models/dashboard"
import Loading from "./loading"
import Dashboard from "../components/Dashboard"
import { getUserInfo } from "../lib/helpers"
import { BookingResponse } from "../models/bookingResponse"

async function getDashboardOverview(hotelId: string) {
  let result: IDashboard = {
  }
  const res = await makeApiCall(`Hotel/Dashboard/Overview/${hotelId}`, 'GET')
  if (res.successful) {
    result = res.data as IDashboard
  }

  return result;
}

async function getRecentBookings(hotelId: string) {
  const res = await makeApiCall(`Booking/Hotel/Recent/${hotelId}`, 'GET')
  if (res.successful) {
    return res.data
  }

  return [];
}

async function DashboardPage() {
  const { hotelId } = await getUserInfo()
  const dashboardData: IDashboard = await getDashboardOverview(hotelId)
  const bookings: BookingResponse[] = await getRecentBookings(hotelId) as BookingResponse[]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-6'>
          Overview
        </p>
        <Suspense fallback={<Loading />}>
        <Dashboard dashboardData={dashboardData} bookings={bookings}/>
        </Suspense>
      </div>
    </main>
  )
}

export default DashboardPage;