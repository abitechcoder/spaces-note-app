import axios from "axios";
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
export const signInWithGoogle = async () => {
  Axios.defaults.maxRedirects=0;
  Axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.log(error.response);
        const redirectUrl = error.response;
        return axiosInstance.get(redirectUrl);
      }
      return Promise.reject(error);
    }

  );
  
  
  Axios.get(`${googleAuthEndpoint}`);
};
