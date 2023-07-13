'use server'
import { User } from "../models/user"
import { cookies } from 'next/headers'

export async function getUserInfo() {
    // const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/info`)
    // // const result = await fetch(`https://manager.mybcloud.com/api/users/info`)
    // return await result.json() as User
    const userInfo = cookies().get('user')
    return JSON.parse(String(userInfo?.value)) as User
}