import { Axios } from "./axios";

export const shortenUrl = async (urlData: { originalUrl: string }) => {
    try {
        const response = await Axios.post("/api/short-url", urlData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "URL shortening failed";
    }
};