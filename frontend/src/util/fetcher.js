import { Axios } from "../Axios";

const accessToken= JSON.parse(localStorage.getItem("access-token"))
console.log(accessToken);
export const fetcher = (url) => Axios.get(url,{
    headers:{
        Authorization:` Bearer ${accessToken}`,
      }
}).then((res) => res.data);

export const poster = (...args) => Axios.post(...args,{
  headers:{
      Authorization:` Bearer ${accessToken}`,
    }
}).then((res) => res.data);

export const patcher = (...args) => Axios.patch(...args,{
  headers:{
      Authorization:` Bearer ${accessToken}`,
    }
}).then((res) => res.data);

export const deleter = (...args) => Axios.delete(...args,{
  headers:{
      Authorization:` Bearer ${accessToken}`,
    }
}).then((res) => res.data);
