export class DepartmentModel {
    department: string;
    departmentId: number;
    description: string;

    constructor(
        department: string,
        departmentId: number,
        description: string
    ) {
        this.department = department;
        this.departmentId = departmentId;
        this.description = description;
    }
}
