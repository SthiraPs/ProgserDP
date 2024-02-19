export class RoleModel {
    role: string;
    roleId: number;
    description: string;

    constructor(
        role: string,
        roleId: number,
        description: string
    ) {
        this.role = role;
        this.roleId = roleId;
        this.description = description;
    }
}
