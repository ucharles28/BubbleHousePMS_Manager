import { User } from "../models/user"

export async function getUserInfo() {
    // const cookieStore = cookies()
    // console.log(cookieStore.get('user')?.value)
    // if (!process.env.HOST){
    //     return { hotelId: '', userId: ''}
    // }
    // const result = await fetch(`${process.env.HOST}/api/users/info`)
    // const result = await fetch(`http://localhost:3000/api/users/info`)
    const result = await fetch(`https://manager.mybcloud.com/api/users/info`)
    return await result.json() as User
}