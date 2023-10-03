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
  return response.data;
};
const refreshToken = async (email) => {
  const response = await Axios.post(`${AUTH_ENDPOINT}/signin/refresh-token`, {
    email,
  });
  return response.data;
};

const logout = () => {
  return;
};

const authService = { register, login, logout, refreshToken };

export default authService;
