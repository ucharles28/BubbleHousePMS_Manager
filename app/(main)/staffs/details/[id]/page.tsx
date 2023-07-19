import Loading from "@/app/(main)/loading"
import StaffDetails from "@/app/components/StaffDetails"
import { makeApiCall } from "@/app/helpers/apiRequest"
import { StaffResponse } from "@/app/models/staffResponse"
import { Suspense } from "react"

async function getStaffDetails(id:string) {
  const response = await makeApiCall(`User/${id}`, 'GET')
  if (response.successful) {
    return response.data
  }

  return {}
}

async function NewStaff({ params }: { params: { id: string } }) {
  const staff: StaffResponse = await getStaffDetails(params.id)
  return (
    <Suspense fallback={<Loading />}>
      <StaffDetails staff={staff} />
    </Suspense>
  )
}

export default NewStaff