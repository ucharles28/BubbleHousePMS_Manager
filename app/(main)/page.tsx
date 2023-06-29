'use client'

import { Suspense, useContext } from "react"
import { makeApiCall } from "../helpers/apiRequest"
import { IDashboard } from "../models/dashboard"
import { AppContext } from "../context/appContext"
import Loading from "./loading"
import Dashboard from "../components/Dashboard"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { User } from "../models/user"
import { getUserInfo } from "../lib/helpers"

async function getDashboardOverview(hotelId: string) {
  let result: IDashboard = {
  }
  const res = await makeApiCall(`Hotel/Dashboard/Overview/${hotelId}`, 'GET')
  if (res.successful) {
    result = res.data as IDashboard
  }

  return result;
}

async function DashboardPage() {
 const {hotelId} = await getUserInfo()
  const dashboardData: IDashboard = await getDashboardOverview(hotelId)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
      <div className='w-full h-full py-6 flex flex-col gap-6'>
        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-6'>
          Overview
        </p>
        <Suspense fallback={<Loading />}>
          <Dashboard dashboardData={dashboardData}/>
        </Suspense>
      </div>
    </main>
  )
}

export default DashboardPage;