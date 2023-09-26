import axios from "axios";

export const Axios = axios.create({
    withCredentials:true,
    baseURL: "http://127.0.0.1:5000",
    headers:{
        "Content-Type":"application/json"
    },
})

export const axiosPrivate=axios.create({
    baseURL:"http://127.0.0.1:5000",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})