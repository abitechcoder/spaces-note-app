import { Axios } from "../Axios"
export const fetcher = url => Axios.get(url).then(res => res.data)