import { User } from "../models/user"

export async function getUserInfo() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/info`)
    // const result = await fetch(`https://manager.mybcloud.com/api/users/info`)
    return await result.json() as User
}