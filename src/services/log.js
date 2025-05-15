import { auth, post, postJson } from "../utils/request"

export const getLogs = async (id, token) => {
    const data = await auth("/logs/" + id, token)
    return data
}

export const createLog = async (data, token) => {
    const dataApi = await postJson("/logs/create", data, token);
    return dataApi
}