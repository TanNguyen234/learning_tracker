import { get } from "../utils/request"

export const getSkill = async () => {
    const data = await get("/skills");
    if(data.code !== 200) return null;
    return data
}

export const getSkillDetail = async (id) => {
    if(!id) return null;
    const data = await get("/skill/"+id);
    if(data.code !== 200) return null;
    return data
}