import { Axios } from "../../Axios";

const USER_ENDPOINT = "/user";
const AUTH_ENDPOINT = "/auth";

const register = async ({ email, password }) => {
  const response = await Axios.post(USER_ENDPOINT, { email, password });
  return response.data;
};

// Login User
const login = async ({ email, password }) => {
  const response = await Axios.post(`${AUTH_ENDPOINT}/signin`, {
    email,
    password,
  });
  const {userAccount, accessToken} = response.data;
  const data = {
    userAccount,
    accessToken
  }
  localStorage.setItem("user", JSON.stringify(data))
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const refreshToken = async (email) => {
  try {
    const response = await Axios.post(`${AUTH_ENDPOINT}/signin/refresh-token`, {email});
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

// export const getUser = async (userId) => {
//     const response = await Axios.get(`${USER_ENDPOINT}/${userId}`);
//     return response.data;
// }

const authService = { register, login, logout, refreshToken };

export default authService;
