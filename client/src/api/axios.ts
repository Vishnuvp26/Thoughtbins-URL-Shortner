import store from '@/redux/store/store';
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const Axios = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

Axios.interceptors.request.use(
    (config) => {
        const token = store.getState().user.accessToken;
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`
        }
        return config
    }
);