import { Axios } from ".";

export const usersUrlEndpoint = "/user";

export const getUser = async (userId) => {
    const response = await Axios.get(`${usersUrlEndpoint}/${userId}`);
    return response.data;
}

export const createUser = async ({email, password}) => {
    const response = await Axios.post(`${usersUrlEndpoint}`, {email, password})
    return response.data;
}