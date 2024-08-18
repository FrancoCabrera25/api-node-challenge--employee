import axios from 'axios';
import { EmployeeModel } from '../../data';
import { CustomError } from '../../domain';
import { CreateEmployeeDto } from '../../domain/dtos/employee/create-employee.dto';
import { SearchEmployeeDto } from '../../domain/dtos/employee/search-employee.dto';
import { UpdateEmployeeDto } from '../../domain/dtos/employee/update-employee.dto';
export class EmployeeService {
    constructor() {}

    private readonly POSITIONS_URL = 'https://ibillboard.com/api/positions';

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employeeExists = await EmployeeModel.findOne({ email: createEmployeeDto.email });

        if (employeeExists) throw CustomError.badRequest('Employee exists');

        try {
            const employee = new EmployeeModel({
                ...createEmployeeDto,
            });

            await employee.save();
            return employee;
        } catch (error) {
            throw CustomError.internalServer('Internal server');
        }
    }

    async update(employeeId: string, updateEmployeeDto: UpdateEmployeeDto) {
        try {
            const employee = await EmployeeModel.findByIdAndUpdate(
                employeeId,
                { $set: updateEmployeeDto },
                { new: true, runValidators: true }
            );

            if (!employee) {
                throw CustomError.notFound('Employee not found');
            }

            return employee;
        } catch (error) {
            throw CustomError.internalServer('Internal server error');
        }
    }

    async deactivate(employeeId: string) {
        try {
            const employee = await EmployeeModel.findByIdAndUpdate(
                employeeId,
                { $set: { active: false } },
                { new: true }
            );

            if (!employee) {
                throw CustomError.notFound('Employee not found');
            }

            return employee;
        } catch (error) {
            throw CustomError.internalServer('Internal server error');
        }
    }

    async get({ name, page, limit }: SearchEmployeeDto): Promise<any> {
        try {
            const filter = name ? { name: { $regex: name, $options: 'i' } } : {};

            const [total, employees] = await Promise.all([
                EmployeeModel.countDocuments(),
                EmployeeModel.find(filter)
                    .skip((page - 1) * limit)
                    .limit(limit),
            ]);

            return {
                limit,
                page,
                total,
                employees,
            };
        } catch (error) {
            throw CustomError.internalServer('Internal Server error');
        }
    }

    async getByEmail(email: string): Promise<any> {
        try {
            const employee = EmployeeModel.findOne({ email });

            if (!employee) {
                throw CustomError.notFound(`Employee not found ${email}`);
            }
            return employee;
        } catch (error) {
            throw CustomError.internalServer('Internal Server error');
        }
    }

    async getJobPositions() {
        try {
            const response = await axios.get(this.POSITIONS_URL);
            return response.data;
        } catch (error) {
            throw CustomError.internalServer('Error fetching job positions');
        }
    }
}
