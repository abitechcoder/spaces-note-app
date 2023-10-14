import axios from "axios";
import authService from "../features/auth/authService";

export const Axios = axios.create({
    withCredentials:true,
    baseURL: "https://space-note-app.onrender.com",
    // baseURL: "http://127.0.0.1:5000",
    headers:{
        "Content-Type":"application/json"
    },
})

Axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 403 || error.response.statusText === "Forbidden") {
        const {userAccount} = JSON.parse(localStorage.getItem("user"));
        // console.log("User Details:", userAccount);
        const response = await authService.refreshToken(userAccount.email);
        // console.log("Refresh Token:", response.accessToken);
        if(response.success === "true") {
            Axios.defaults.headers.common['authorization'] = `Bearer ${response.accessToken}`;

            return Axios(error. config);
        }

        return error;
    }
})

// export const axiosPrivate=axios.create({
//     baseURL:"http://127.0.0.1:5000",
//     withCredentials:true,
//     headers:{
//         "Content-Type":"application/json"
//     }
// })