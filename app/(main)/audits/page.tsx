import Audits from '@/app/components/Audits'
import { getUserInfo } from '@/app/lib/helpers'
import React from 'react'

const AuditsPage = async () => {
    const { hotelId } = await getUserInfo()
  return (
    <Audits hotelId={hotelId} />
  )
}

export default AuditsPage
