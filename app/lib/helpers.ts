import { User } from "../models/user"

export async function getUserInfo() {
    const result = await fetch('http://localhost:3000/api/users/info')
    return await result.json() as User
}