
import { Request, Response } from 'express';

export const logger = (req: Request, res: Response, next) => {
    console.log('ip initiatrice de la request : ', req.ip);
    next();
}