import { makeApiCall } from "@/app/helpers/apiRequest";
import { getUserInfo } from "@/app/lib/helpers";
import { PropertyPolicy } from "@/app/models/propertyPolicy";
import { Suspense } from "react";
import Loading from "../../loading";
import ProperyPolicy from "@/app/components/PropertyPolicy";
import { useRouter } from "next/navigation";

async function getPropertyPolicy(hotelId: string) {
    const res = await makeApiCall(`PropertyPolicy/${hotelId}`, 'GET')
    if (res.successful) {
        return res.data
    }
    return {};
}

export default async function PropertyPolicyPage() {
    const { hotelId } = await getUserInfo()
    const propertyPolicy: PropertyPolicy = await getPropertyPolicy(hotelId) as PropertyPolicy
    
    return (
            <Suspense fallback={<Loading />}>
                <ProperyPolicy propertyPolicyPayload={propertyPolicy} hotelId={hotelId} />
            </Suspense>
    )
}