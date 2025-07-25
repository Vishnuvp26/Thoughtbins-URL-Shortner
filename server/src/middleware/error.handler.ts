import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.errors";
import { HttpStatus } from "../constants/status.constants";
import { Messages } from "../constants/message.constants";

export const errorHandler = (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR || 500
    let message = Messages.SERVER_ERROR

    if (err instanceof HttpError) {
        statusCode = err.statusCode
        message = err.message
    } else {
        console.log('Unhandled', err);
    }
    res.status(statusCode).json({error: message})
}