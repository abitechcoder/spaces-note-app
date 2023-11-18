import { Axios } from "../../Axios";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
  const { userAccount, accessToken } = response.data;
  const data = {
    userAccount,
    accessToken,
  };
  localStorage.setItem("user", JSON.stringify(data));
  console.log("Data:", response.data);
  return response.data;
};

// Login with Google
const googleLogin = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const refreshToken = async (email) => {
  try {
    const response = await Axios.post(`${AUTH_ENDPOINT}/signin/refresh-token`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const authService = { register, login, logout, refreshToken, googleLogin };

export default authService;
