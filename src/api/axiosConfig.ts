import axios from "axios";

export const axiosApiConfig = axios.create({
    baseURL:"https://reqres.in/api/",
});