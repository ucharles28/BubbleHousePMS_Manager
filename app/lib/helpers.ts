import { User } from "../models/user"

export async function getUserInfo() {
    const result = await fetch(`${process.env.HOST}/api/users/info`)
    return await result.json() as User
}

const statusObj: Object = {
    0: 'Pending',
    1: 'Running',
    2: 'Completed',
    3: 'Cancelled',
    4: 'Confirmed'
}

export function getStatusText(status: number) {
    let statusText = ''
    switch (status) {

    }
}