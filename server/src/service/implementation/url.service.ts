import { Types } from "mongoose";
import { IUrl } from "../../model/url.model";
import { IUrlRepository } from "../../repository/interface/IUrlRepository";
import { IUsageRepository } from "../../repository/interface/IUsageRepository";
import { generateShortCode } from "../../utils/url.shortner";
import { IUrlService } from "../interface/IUrlService";
import { Messages } from "../../constants/message.constants";
import { env } from "../../config/env.config";
import { HttpStatus } from "../../constants/status.constants";
import { createHttpError } from "../../utils/http.errors";

export class UrlService implements IUrlService {
    constructor(
        private _urlRepository: IUrlRepository,
        private _userUsageRepository: IUsageRepository
    ) {}

    async shortenUrl(originalUrl: string, userId: string): Promise<IUrl> {
        let usage = await this._userUsageRepository.findByUserId(userId);
        const today = new Date().toDateString();

        if (!usage) {
            usage = await this._userUsageRepository.create({
                userId: new Types.ObjectId(userId),
                urlCountToday: 1,
                lastResetDate: new Date(),
            });
        } else {
            const lastReset = usage.lastResetDate.toDateString();

            if (today !== lastReset) {
                usage.urlCountToday = 0;
                usage.lastResetDate = new Date();
            }

            if (usage.urlCountToday >= 100) {
                throw createHttpError(HttpStatus.BAD_REQUEST, Messages.DAILY_LIMIT_REACHED)
            }

            usage.urlCountToday += 1;
            await usage.save();
        }

        const shortCode = generateShortCode(6);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const newUrl = await this._urlRepository.create({
            originalUrl,
            shortCode,
            userId: new Types.ObjectId(userId),
            expiresAt,
        } as Partial<IUrl>);

        const shortBase = env.REDIRECT_URL
        const shortUrl = `${shortBase}/${newUrl.shortCode}`;

        return {
            ...newUrl.toObject(),
            shortUrl,
        };
    };

    async getOriginalUrl(shortCode: string): Promise<IUrl | null> {
        return this._urlRepository.findByShortCode(shortCode);
    };
}