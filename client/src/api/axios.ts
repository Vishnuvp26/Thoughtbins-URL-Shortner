import store, { persistor } from '@/redux/store/store';
import axios from 'axios'
import { refreshToken } from './auth.api';
import { removeUser, setUser } from '@/redux/slice/auth.slice';

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

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalReq = error.config;
        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;
            try {
                const response = await refreshToken();
                const newAccessToken = response.accessToken;
                store.dispatch(setUser({ accessToken: newAccessToken }));
                originalReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return Axios(originalReq);
            } catch (refreshError) {
                console.log('Refresh error', refreshError);
                store.dispatch(removeUser());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 403) {
            store.dispatch(removeUser());
            persistor.purge();
            window.location.href = "/";
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);