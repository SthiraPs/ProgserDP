export class UserModel {
    userId: number;
    fullName: string;
    passwword: string;
    email: string;
    status?: string;
    lastSeen?: string;
    avatar?: string;
    department: string;
    role: string;

    constructor(
        userId: number,
        fullName: string,
        passwword: string,
        email: string,
        status: string,
        lastSeen: string,
        avatar: string,
        department: string,
        role: string
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.passwword = passwword;
        this.email = email;
        this.status = status;
        this.lastSeen = lastSeen;
        this.avatar = avatar;
        this.department = department;
        this.role = role;
    }
}
