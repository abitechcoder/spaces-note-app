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
  // Axios.defaults.maxRedirects=0;
  // Axios.interceptors.response.use(
  //   response => {
  //   return response
  // },
  //   error => {
  //     //   if (error.response) {
  //     //   const redirectUrl = error.response.headers;
  //     //   return Axios.get(redirectUrl);
  //     // }
  //     return Promise.reject(error);
  //   }

  // );
  
  
  const response=await Axios.get(`${googleAuthEndpoint}`);
  console.log(response);
};
