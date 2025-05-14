import { auth, authPost, post } from "../utils/request"

export const getLogs = async (id, token) => {
    const data = await auth("/logs/" + id, token)
    return data
}

export const createLog = async (data, token) => {
    const dataApi = await post("/logs/create", data, token);
    return dataApi
}