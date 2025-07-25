import { Router } from "express";
import { UrlRepository } from "../repository/implementation/url.repository";
import { UsageRepository } from "../repository/implementation/usage.repository";
import { UrlService } from "../service/implementation/url.service";
import { UrlController } from "../controller/implementation/url.controller";
import { authenticateToken } from "../middleware/auth";

const router = Router();

const urlRepository = new UrlRepository();
const userUsageRepository = new UsageRepository();
const urlService = new UrlService(urlRepository, userUsageRepository);
const urlController = new UrlController(urlService)

router.post(
    '/short-url',
    authenticateToken,
    urlController.shortenUrl.bind(urlController)
);

export default router