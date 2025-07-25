import Url, { IUrl } from "../../model/url.model";
import { IUrlRepository } from "../interface/IUrlRepository";
import { BaseRepository } from "./base.repository";

export class UrlRepository extends BaseRepository<IUrl> implements IUrlRepository {
    constructor() {
        super(Url)
    }

    async findByShortCode(code: string) {
        return this.findOne({ shortCode: code });
    }

    async findByUserId(userId: string) {
        return this.find({ userId });
    };
}