import Loading from '@/app/(main)/loading'
import CompanyDetails from '@/app/components/CompanyDetails'
import { makeApiCall } from '@/app/helpers/apiRequest'
import { Company } from '@/app/models/company'
import React, { Suspense, useEffect } from 'react'

async function getCompany(id:string) {
  const response = await makeApiCall(`Company/${id}`, 'GET')
  if (response.successful) {
    return response.data
  }

  return {}
}

const CompanyDetailsPage = async({params}: {params: {id: string}}) => {
  const company: Company = await getCompany(params.id) as Company
    return (
      <Suspense fallback={<Loading />}>
        <CompanyDetails company={company} />
      </Suspense>
    )
}

export default CompanyDetailsPage
