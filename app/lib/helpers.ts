import { User } from "../models/user"

export async function getUserInfo() {
    let host = window.location.hostname;

    if (host === 'localhost') {
        host = `${host}:3000`
    }
    const result = await fetch(`${host}/api/users/info`)
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