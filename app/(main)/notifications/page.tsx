import { makeApiCall } from '@/app/helpers/apiRequest';
import { getUserInfo } from '@/app/lib/helpers'
import React, { Suspense } from 'react'
import Loading from '../loading';
import Notifications from '@/app/components/Notifications';
import { Notification } from '@/app/models/notification';

async function getNotifications(userId:string) {
  const res = await makeApiCall(`Notification/${userId}`, 'GET')
    if (res.successful) {
        return res.data
    }

    return [];
}

async function NotificationsPage() {
  const { userId } = await getUserInfo();
  const notifications: Notification[] = await getNotifications(userId) as Notification[]
  return (
    <Suspense fallback={<Loading />}>
      <Notifications notifications={notifications}/>
    </Suspense>
  )
}

export default NotificationsPage