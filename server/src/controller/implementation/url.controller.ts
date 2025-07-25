import { Request, Response, NextFunction } from "express";
import { IUrlService } from "../../service/interface/IUrlService";
import { IUrlController } from "../interface/IUrlController";
import { AuthRequest } from "../../middleware/auth";
import { HttpStatus } from "../../constants/status.constants";
import { Messages } from "../../constants/message.constants";
import { isValidUrl } from "../../utils/validate.url";

export class UrlController implements IUrlController {
    constructor(private _urlService: IUrlService) { }
    
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

    async redirectUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { code } = req.params;
            const url = await this._urlService.getOriginalUrl(code);

            if (!url || url.expiresAt < new Date()) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.URL_EXPIRED });
                return
            }

            url.clickCount += 1;
            
            await url.save();

            res.redirect(url.originalUrl);
        } catch (error) {
            next(error)
        }
    };
}