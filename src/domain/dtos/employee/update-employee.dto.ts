import { CreateEmployeeDto } from "./create-employee.dto";

export class UpdateEmployeeDto extends CreateEmployeeDto {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public birthdate: Date,
        public position: string
    ) {
        super(name, lastName, email, birthdate, position);
    }
}
