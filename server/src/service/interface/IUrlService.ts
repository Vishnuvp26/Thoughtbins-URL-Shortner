import { IUrl } from "../../model/url.model";

export interface IUrlService {
    shortenUrl(originalUrl: string, userId: string): Promise<IUrl>;
    getOriginalUrl(shortCode: string): Promise<IUrl | null>;
    getAnalytics(userId: string): Promise<{
        shortCode: string;
        shortUrl: string;
        originalUrl: string;
        clickCount: number;
        countryDistribution: Record<string, number>;
        geoData: {
            ip: string;
            country: string;
            time: string;
        }[];
    }[]>;
}