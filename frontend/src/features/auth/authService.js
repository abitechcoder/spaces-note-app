import { Axios } from "../../Axios";

const USER_ENDPOINT = "/user";
const AUTH_ENDPOINT = "/auth";

const register = async ({ email, password }) => {
  const response = await Axios.post(USER_ENDPOINT, { email, password });

  // if (response.data) {
  //   const { userAccount } = response.data;
  //   localStorage.setItem("user", JSON.stringify(userAccount));
  // }
  return response.data;
};

// Login User
const login = async ({ email, password }) => {
  const response = await Axios.post(`${AUTH_ENDPOINT}/signin`, { email, password });
  if (response.data) {
    // const { userAccount } = response.data;
    // console.log(response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("access-token", JSON.stringify(response.data.accessToken));
  }
  return response.data;
};
const refreshToken = async (email) => {
  const response = await Axios.post(`${AUTH_ENDPOINT}/signin/refresh-token`, { email });
  if (response.data) {
    // const { userAccount } = response.data;
    // console.log(response.data);
    // localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access-token");
};

// export const getUser = async (userId) => {
//     const response = await Axios.get(`${USER_ENDPOINT}/${userId}`);
//     return response.data;
// }

const authService = { register, login, logout ,refreshToken};

export default authService;
