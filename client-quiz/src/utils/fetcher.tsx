import axios from "axios";

const axiosGet = (url: string) => axios.get(`http://localhost:4000${url}`).then((res) => res.data);

const axiosPost = (url: string, data: any = {}) => axios.post(`http://localhost:4000${url}`, data).then((res) => res.data);

export {
    axiosGet,
    axiosPost,
}
