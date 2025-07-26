import axios from "axios";

export interface GeoData {
    ip: string;
    country: string;
}

export const getGeoData = async (req: any): Promise<GeoData> => {
    let ip = req.ip || "";

    if (ip === "::1" || ip === "127.0.0.1" || ip.includes("::ffff:127.0.0.1")) {
        ip = "8.8.8.8";
    }

    if (ip.includes("::ffff:")) {
        ip = ip.split("::ffff:")[1];
    }

    try {
        const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = geoRes?.data?.country_name || "Unknown";
        return { ip, country };
    } catch {
        return { ip, country: "Unknown" };
    }
};