import { IUserUsage } from "../../model/usage.model";
import { IBaseRepository } from "./IBaseRepository";

export interface IUsageRepository extends IBaseRepository<IUserUsage> {
    findByUserId(userId: string): Promise<IUserUsage | null>;
}