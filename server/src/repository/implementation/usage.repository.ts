import UserUsage, { IUserUsage } from "../../model/usage.model";
import { IUsageRepository } from "../interface/IUsageRepository";
import { BaseRepository } from "./base.repository";

export class UsageRepository extends BaseRepository<IUserUsage> implements IUsageRepository {
    constructor() {
        super(UserUsage)
    }

    async findByUserId(userId: string) {
        return this.findOne({ userId });
    }
}