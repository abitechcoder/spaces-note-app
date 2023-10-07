import { useGoogleLogin } from "@react-oauth/google";
import { Axios } from "../Axios";

export const fetcher = (url) => Axios.get(url).then((res) => res.data);

export const poster = (...args) => Axios.post(...args).then((res) => res.data);

export const patcher = (...args) => Axios.patch(...args).then((res) => res.data);

export const deleter = (...args) => Axios.delete(...args).then((res) => res.data);

