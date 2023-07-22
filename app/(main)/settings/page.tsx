import { makeApiCall } from "@/app/helpers/apiRequest"
import { getUserInfo } from "@/app/lib/helpers";
import { Suspense } from "react";
import Loading from "../loading";
import SettingsComponent from "@/app/components/SettingsComponent";

async function getUser(userId: string) {
  const response = await makeApiCall(`User/${userId}`, 'GET')
  if (response.successful) {
    return response.data
  }
  return {};
}

async function SettingsPage() {
  const { userId } = await getUserInfo();
  const user: any = await getUser(userId)

  return (
    <Suspense fallback={<Loading />}>
      <SettingsComponent user={user} />
    </Suspense>
  )
}

export default SettingsPage