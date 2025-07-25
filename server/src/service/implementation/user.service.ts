import { Messages } from "../../constants/message.constants";
import { HttpStatus } from "../../constants/status.constants";
import { LoginDTO } from "../../dto/login.dto";
import { IUser } from "../../model/user.model";
import { IBaseRepository } from "../../repository/interface/IBaseRepository";
import { createHttpError } from "../../utils/http.errors";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { IUserService } from "../interface/IUserService";

export class UserService implements IUserService {
    constructor(private _userReposity: IBaseRepository<IUser>) { }
    
    async register(name: string, email: string, password: string): Promise<{ message: string; }> {
        const existingUser = await this._userReposity.findOne({ email });

        if (existingUser) {
            throw createHttpError(HttpStatus.CONFLICT, Messages.USER_EXIST)
        }

        const hashedPassword = await hashPassword(password);

        await this._userReposity.create({ name, email, password: hashedPassword });

        return {message: Messages.SIGNUP_SUCCESS}
    };

    async login(email: string, password: string): Promise<LoginDTO> {
        const user = await this._userReposity.findOne({ email });

        if (!user) {
            throw createHttpError(HttpStatus.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            throw createHttpError(HttpStatus.BAD_REQUEST, Messages.INVALID_CREDENTIALS)
        }

        const accessToken = generateAccessToken(user.id.toString());
        const refreshToken = generateRefreshToken(user.id.toString());

        return {
            message: Messages.LOGIN_SUCCESS,
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        };
    };

    async refreshAccessToken(token: string): Promise<string> {
        const decoded = verifyRefreshToken(token);

        if (!decoded){
            throw createHttpError(HttpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN)
        }

        const accessToken = generateAccessToken(decoded.id);

        return accessToken;
    };
}