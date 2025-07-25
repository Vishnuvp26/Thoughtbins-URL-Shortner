import { Request, Response, NextFunction } from "express";
import { IUserController } from "../interface/IUserController";
import { IUserService } from "../../service/interface/IUserService";
import { HttpStatus } from "../../constants/status.constants";

export class UserController implements IUserController {
    constructor(private _userService: IUserService) { }
    
    // Register
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const response = await this._userService.register(name, email, password);
            res.status(HttpStatus.OK).json({message: response.message})
        } catch (error) {
            next(error)
        }
    };

    // Login
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body
            const response = await this._userService.login(email, password);

            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(HttpStatus.OK).json({
                message: response.message,
                user: response.user,
                accessToken: response.accessToken,
            });
        } catch (error) {
            next(error)
        }
    };

    // Refresh token
    async refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;
            const accessToken = await this._userService.refreshAccessToken(refreshToken);
            res.status(HttpStatus.OK).json({ accessToken });
        } catch (error) {
            next(error)
        }
    };
}