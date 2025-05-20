const customFetch = async <T = any>(url: string, options?: RequestInit):Promise<T> => {
    try {
        const response: Response = await fetch(url, options)
        if (!response.ok) {
            throw new Error('Something went wrong')
        }
        const data = await response.json()
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export default customFetch