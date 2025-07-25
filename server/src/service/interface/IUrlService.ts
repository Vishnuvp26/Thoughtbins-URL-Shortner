import { IUrl } from "../../model/url.model";

export interface IUrlService {
    shortenUrl(originalUrl: string, userId: string): Promise<IUrl>;
    getOriginalUrl(shortCode: string): Promise<IUrl | null>;
}