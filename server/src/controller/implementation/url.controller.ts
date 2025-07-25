import { Request, Response, NextFunction } from "express";
import { IUrlService } from "../../service/interface/IUrlService";
import { IUrlController } from "../interface/IUrlController";
import { AuthRequest } from "../../middleware/auth";
import { HttpStatus } from "../../constants/status.constants";
import { Messages } from "../../constants/message.constants";
import { isValidUrl } from "../../utils/validate.url";
import { getGeoData } from "../../utils/geo.data";

export class UrlController implements IUrlController {
    constructor(private _urlService: IUrlService) { }
    
    // Short the url
    async shortenUrl(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { originalUrl } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.INVALID_ID });
                return
            }

            if (!originalUrl || typeof originalUrl !== 'string' || !isValidUrl(originalUrl)) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.INVALID_URL });
                return;
            }

            const data = await this._urlService.shortenUrl(originalUrl, userId);

            res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            next(error)
        }
    };

    // Redirect to original url
    async redirectUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { code } = req.params;
            const url = await this._urlService.getOriginalUrl(code);

            if (!url || url.expiresAt < new Date()) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.URL_EXPIRED });
                return
            }

            url.clickCount += 1;

            const { ip, country } = await getGeoData(req);
            url.geoData.push({ ip, country, time: new Date() });
            
            await url.save();

            res.redirect(url.originalUrl);
        } catch (error) {
            next(error)
        }
    };

    // Geo-distribution analytics 
    async getAnalytics(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.INVALID_ID });
                return;
            }

            const data = await this._urlService.getAnalytics(userId);
            res.status(HttpStatus.OK).json(data);
        } catch (error) {
            next(error);
        }
    };
}