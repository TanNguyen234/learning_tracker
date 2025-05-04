export const userLogin = (data) => {
    return {
        type: 'user/login',
        payload: data
    }
}  

export const userLogout = () => {
    return {
        type: 'user/logout'
    }
}  

export const stats = (data) => {
    return {
        type: 'stats/get',
        payload: data
    }
}

export const skills = (data) => {
    return {
        type: 'skills/get',
        payload: data
    }
}

export const logs = (data) => {
    return {
        type: 'logs/get',
        payload: data
    }
}