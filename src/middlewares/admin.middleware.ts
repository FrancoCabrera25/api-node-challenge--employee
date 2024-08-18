import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../data/mongo/models/user.model';

export class AdminMiddleware {
    static async isUserAdmin(req: Request, res: Response, next: NextFunction) {
        const user = (req.body as any).user as any;

        if (user.role !== 'ADMIN') {
            return res.status(401).json({ error: 'User not permisions' });
        }
        next();
    }
}
