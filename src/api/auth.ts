import { request } from "../utils/request"

interface loginPayload {
    email: string,
    password: string,
    rememberMe: boolean
}

export const logInAPI = async (payload: loginPayload) => {
    const response = await request({ url: "/auth/login", method: "POST", body: payload })
    return response;
}

export const logOutAPI = async () => {
    const response = await request({ url: "/auth/logout", method: "GET" })
    return response;
}