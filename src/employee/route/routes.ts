import { Router } from 'express';
import { EmployeeService } from '../services/employee.service';
import { EmployeeController } from '../controllers/controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { AdminMiddleware } from '../../middlewares/admin.middleware';

export class EmployeeRoutes {
    static get routes(): Router {
        const router = Router();
        const employeeService = new EmployeeService();
        const controller = new EmployeeController(employeeService);

        router.use(AuthMiddleware.validateJWT);

        router.post('', [AdminMiddleware.isUserAdmin], controller.create);
        router.put('/:id', [AdminMiddleware.isUserAdmin], controller.update);
        router.get('/list', [AdminMiddleware.isUserAdmin], controller.get);
        router.get('/jobsPositions', controller.getJobPositions);
        router.get('byEmail/:email', controller.getByEmail);

        return router;
    }
}
