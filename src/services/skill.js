import { auth, postJson } from "../utils/request"

export const getSkill = async (token, current_page = 1, limit) => {
   try {
        const res = await auth(`/skills/?current_page=${current_page}&limit=${limit}`, token);
        if (!res || !res.data || !res.pagination) return null;
        return res;
    } catch (error) {
        console.error('Error fetching skill data:', error);
        return null;
    }
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