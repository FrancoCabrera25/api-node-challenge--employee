export class SearchEmployeeDto {
    constructor(public readonly name: string, public readonly page: number, public readonly limit: number) {}

    static create(name = '', page: number = 1, limit: number = 10): [string?, SearchEmployeeDto?] {
        if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers'];

        if (page <= 0) return ['Page must be greater than 0'];
        if (limit <= 0) return ['Limit must be greater than 0'];

        return [undefined, new SearchEmployeeDto(name, page, limit)];
    }
}
