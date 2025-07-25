import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../../middleware/auth";

export interface IUrlController {
    shortenUrl(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    redirectUrl(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAnalytics(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}