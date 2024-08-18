import e from 'express';

export class CreateEmployeeDto {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public birthdate: Date,
        public position: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateEmployeeDto?] {
        const { name, lastName, email, birthdate, position } = object;

        if (!name) {
            return ['Missing name'];
        }

        if (!lastName) {
            return ['Missing lastName'];
        }

        if (!email) {
            return ['Missing email'];
        }

        if (!birthdate) {
            return ['Missing birthdate'];
        }

        if (!position) {
            return ['Missing position'];
        }

        const [day, month, year] = birthdate.split('/').map(Number);
        const birthdateFormat = new Date(year, month - 1, day);
        // if (regularExps.email.test(email)) {
        //     return ['Email is not valid'];
        // }

        return [undefined, new CreateEmployeeDto(name, lastName, email, birthdateFormat, position)];
    }
}
