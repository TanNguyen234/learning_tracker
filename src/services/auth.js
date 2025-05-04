import { auth, post } from "../utils/request";

export const loginApi = async (data) => {
    const res = await post('/auth/login', data, );
    return res;
};

export const authApi = async (token) => {
    const res = await auth('/auth', token);
    return res;
};