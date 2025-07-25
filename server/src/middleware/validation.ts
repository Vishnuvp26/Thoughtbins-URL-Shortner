import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/status.constants';
import { VALIDATION } from '../constants/message.constants';

const registerSchema = z.object({
    name: z.string()
        .min(2, { message: VALIDATION.NAME_MIN })
        .max(50, { message: VALIDATION.NAME_MAX }),
    email: z.string()
        .email({ message: VALIDATION.EMAIL_INVALID }),
    password: z.string()
        .min(8, { message: VALIDATION.PASSWORD_MIN })
        .regex(/[A-Z]/, { message: VALIDATION.PASSWORD_UPPERCASE })
        .regex(/[a-z]/, { message: VALIDATION.PASSWORD_LOWERCASE })
        .regex(/[0-9]/, { message: VALIDATION.PASSWORD_NUMBER })
        .regex(/[^A-Za-z0-9]/, { message: VALIDATION.PASSWORD_SPECIAL }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: VALIDATION.CONFIRM_PASSWORD_MISMATCH,
    path: ['confirmPassword'],
});

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formatted = error.flatten();
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Validation failed',
                errors: formatted.fieldErrors,
            });
        } else {
            next(error);
        }
    }
};