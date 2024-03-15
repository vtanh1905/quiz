import axios from "axios";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

const axiosGet = (url: string) =>
  axios.get(`http://13.229.48.145:4000${url}`).then((res) => res.data);

const axiosPost = (url: string, data: any = {}, isAuth: boolean = true) =>
  axios
    .post(
      `http://13.229.48.145:4000${url}`,
      data,
      isAuth
        ? {
            headers: {
              Authorization: `Bearer ${getCookie("access-token")}`,
            },
          }
        : {}
    )
    .then((res) => res.data);

export { axiosGet, axiosPost };
