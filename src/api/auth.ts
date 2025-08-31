import { request } from "../utils/request"

export const logInAPI = async (email: string, password: string, rememberMe: boolean) => {
    const response = await request({url: "", method:"POST", body: {email, password, rememberMe},})
    return response;
}

export const logOutAPI = async () => {
    const response = await request({url: "", method:"GET",})
    return response;
}