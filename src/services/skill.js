import { auth, get, postJson } from "../utils/request"

export const getSkill = async (token) => {
    const data = await auth("/skills", token);
    if(!data) return null;
    return data
}

export const getSkillDetail = async (id, token) => {
    if(!id) return null;
    const data = await auth("/skills/" + id, token);
    if(!data) return null;
    return data
}

export const createSkill = async (data, token) => {
    const dataApi = await postJson("/skills/create", data, token);
    return dataApi
}