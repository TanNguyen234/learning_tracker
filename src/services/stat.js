import { auth } from "../utils/request"

export const getStat = async (token) => {
    const data = await auth("/stats", token);
    if(!data) return null;
    return data
}