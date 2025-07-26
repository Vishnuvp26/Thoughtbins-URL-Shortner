import { IUrl } from "../../model/url.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IUrlRepository extends IBaseRepository<IUrl> {
    findByShortCode(code: string): Promise<IUrl | null>;
    findByUserId(userId: string): Promise<IUrl[]>;
    findByOriginalUrlAndUser(originalUrl: string, userId: string): Promise<IUrl | null>;
}