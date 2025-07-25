import { Router } from "express";
import { UserService } from "../service/implementation/user.service";
import { BaseRepository } from "../repository/implementation/base.repository";
import User, { IUser } from "../model/user.model";
import { UserController } from "../controller/implementation/user.controller";
import { validateRegister } from "../middleware/validation";

const router = Router()

const userRepository = new BaseRepository<IUser>(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
    '/register',
    validateRegister,
    userController.register.bind(userController)
);

router.post(
    '/login',
    userController.login.bind(userController)
);

router.post(
    '/refresh-token',
    userController.refreshAccessToken.bind(userController)
);

export default router;