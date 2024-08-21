import { Router } from 'express';
import { AuthRoutes } from './auth/route/routes';
import { EmployeeRoutes } from './employee/route/routes';
export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/employee', EmployeeRoutes.routes);
        return router;
    }
}
