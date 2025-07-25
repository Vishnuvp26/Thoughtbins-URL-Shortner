import axios from "axios";

export interface GeoData {
    ip: string;
    country: string;
}

export const getGeoData = async (req: any): Promise<GeoData> => {
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    let ip = Array.isArray(rawIp) ? rawIp[0] : rawIp.toString().split(",")[0].trim();

    if (ip === "::1" || ip === "127.0.0.1") {
        ip = "8.8.8.8";
    }

    try {
        const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = geoRes?.data?.country_name || "Unknown";
        return { ip, country };
    } catch {
        return { ip, country: "Unknown" };
    }
};