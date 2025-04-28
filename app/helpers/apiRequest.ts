// const baseUrl = 'https://localhost:7298/api/'
const baseUrl = process.env.NEXT_PUBLIC_REACT_API_BASE_URL

export async function makeApiCall(url: String, method: 'POST' | 'GET' | 'PUT' | 'DELETE', request: any = {}, isJson: Boolean = true) {
    try {
        const result = await fetch(`${baseUrl}${url}`, {
            method,
            headers: {
                ...isJson && { 'Content-Type': 'application/json' },
                Authorization: `Bearer `,
            },
            ...method != 'GET' && method !== 'DELETE' && {
                body: isJson ? JSON.stringify(request) : request
            }
        })

        let text = await result.text()
        let json: any = {}
        try {
            json = JSON.parse(text);
        } catch (e) {
            json = text
        }

        return {
            successful: result.ok,
            data: json
        }
    } catch (error) {
        return {
            successful: false,
            data: "Something went wrong please try again later"
        }
    }
}
