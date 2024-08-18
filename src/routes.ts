import { Router } from 'express';
import { AuthRoutes } from './auth/route/routes';
import { EmployeeRoutes } from './employee/route/routes';
export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/employee', EmployeeRoutes.routes);
        /*      router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/categories', CategoryRoutes.routes);
        router.use('/api/products', CategoryRoutes.routes);
        router.use('api/upload', FileUploadRoutes.routes);
        router.use('api/images', ImageRoutes.routes); */
        return router;
    }
}
