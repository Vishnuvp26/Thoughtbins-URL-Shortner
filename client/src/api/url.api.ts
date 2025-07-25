import { Axios } from "./axios";

export const shortenUrl = async (urlData: { originalUrl: string }) => {
    try {
        const response = await Axios.post("/api/short-url", urlData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "URL shortening failed";
    }
};

export const getAnalytics = async () => {
    try {
        const response = await Axios.get("/api/analytics");
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Failed to fetch analytics data";
    }
};