import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/controller';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const authService = new AuthService();
        console.log('authService', authService);
        const controller = new AuthController(authService);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.register);
        router.post('/registerAdmin', controller.registerAdmin);

        return router;
    }
}
