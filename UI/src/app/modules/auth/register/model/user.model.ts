export class UserModel {
    userId: number;
    fullName: string;
    username: string;
    passwword: string;
    email: string;
    status?: string;
    lastSeen?: string;
    avatar?: string;

    constructor(
        userId: number,
        fullName: string,
        username: string,
        passwword: string,
        email: string,
        status: string,
        lastSeen: string,
        avatar: string
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.username = username;
        this.passwword = passwword;
        this.email = email;
        this.status = status;
        this.lastSeen = lastSeen;
        this.avatar = avatar;
    }
}
