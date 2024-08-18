import { Response, Request } from 'express';
import { CustomError } from '../../domain';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../../domain/dtos/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../../domain/dtos/employee/update-employee.dto';
import { Validators } from '../../config/validators';
import { SearchEmployeeDto } from '../../domain/dtos/employee/search-employee.dto';

export class EmployeeController {
    constructor(public readonly employeeService: EmployeeService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Interval server error' });
    };

    create = async (req: Request, res: Response) => {
        const [error, createEmployeeDto] = CreateEmployeeDto.create(req.body);

        if (error) return res.status(400).json(error);

        this.employeeService
            .create(createEmployeeDto!)
            .then((employee) => res.status(201).json(employee))
            .catch((error) => this.handleError(error, res));
    };

    update = async (req: Request, res: Response) => {
        const [error, updateEmployeeDto] = UpdateEmployeeDto.create(req.body);
        const employeeId = req.params.id;
        if (error) return res.status(400).json(error);

        if (!Validators.isMongoID(employeeId)) return res.status(400).json(`Invalid format id: ${employeeId}`);

        this.employeeService
            .update(employeeId, updateEmployeeDto!)
            .then((employee) => res.status(200).json(employee))
            .catch((error) => this.handleError(error, res));
    };

    get = async (req: Request, res: Response) => {
        const { name = '', page = 1, limit = 10 } = req.query;

        const [error, searchEmployeeDto] = SearchEmployeeDto.create(name as string, +page, +limit);

        if (error) return res.status(400).json({ error });

        this.employeeService
            .get(searchEmployeeDto!)
            .then((employee) => res.json(employee))
            .catch((error) => this.handleError(error, res));
    };

    getByEmail = async (req: Request, res: Response) => {
        const { email } = req.params;

        this.employeeService
            .getByEmail(email)
            .then((employee) => res.json(employee))
            .catch((error) => this.handleError(error, res));
    };

    getJobPositions = async (req: Request, res: Response) => {
        this.employeeService
            .getJobPositions()
            .then((jobs) => res.json(jobs))
            .catch((error) => this.handleError(error, res));
    };
}
