import { Axios } from ".";

export const usersUrlEndpoint = "/user";
export const googleAuthEndpoint = "/auth/google";

export const getUser = async (userId) => {
  const response = await Axios.get(`${usersUrlEndpoint}/${userId}`);
  return response.data;
};

export const createUser = async ({ email, password }) => {
  const response = await Axios.post(`${usersUrlEndpoint}`, { email, password });
  return response.data;
};
// google authentication 
export const signInWithGoogle = async () => {
  const response=await Axios.get(`${googleAuthEndpoint}`);
  console.log(response);
};
