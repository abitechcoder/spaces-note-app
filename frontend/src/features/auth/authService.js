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
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

// export const getUser = async (userId) => {
//     const response = await Axios.get(`${USER_ENDPOINT}/${userId}`);
//     return response.data;
// }

const authService = { register, login, logout };

export default authService;
