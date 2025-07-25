import { Router } from "express";
import { UrlRepository } from "../repository/implementation/url.repository";
import { UsageRepository } from "../repository/implementation/usage.repository";
import { UrlService } from "../service/implementation/url.service";
import { UrlController } from "../controller/implementation/url.controller";

const router = Router();

const urlRepository = new UrlRepository();
const usageRepository = new UsageRepository();
const urlService = new UrlService(urlRepository, usageRepository);
const urlController = new UrlController(urlService);

router.get('/:code', urlController.redirectUrl.bind(urlController));

export default router;