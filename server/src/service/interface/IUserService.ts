import { LoginDTO } from "../../dto/login.dto";

export interface IUserService {
    register(name: string, email: string, password: string): Promise<{ message: string }>;
    login(email: string, password: string): Promise<LoginDTO>
    refreshAccessToken(token: string): Promise<string>;
}