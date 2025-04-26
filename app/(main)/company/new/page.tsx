import CreateCompany from '@/app/components/CreateCompany'
import { getUserInfo } from '@/app/lib/helpers';
import React from 'react'

const CreateCompanyPage = async() => {
    const { hotelId } = await getUserInfo();

  return (
      <CreateCompany hotelId={hotelId} />
    )
}

export default CreateCompanyPage
