import { jwtDecode } from "jwt-decode";

export interface User {
    id: number;
    username: string;
    admin: boolean;
    exp: number;
}

export const getUserFromToken = (): User | null => {
    const token = sessionStorage.getItem("token")
    if (!token) return null
    try {
        const decoded: User = jwtDecode(token)
        if (decoded.exp * 1000 < Date.now()) {
            sessionStorage.removeItem("token")
            return null
        }
        return decoded
    } catch {
        return null
    }
}