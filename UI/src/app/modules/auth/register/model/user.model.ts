export class UserModel {
    fullName: string;
    username: string;
    passwword: string;
    email: string;

    constructor(
        fullName: string,
        username: string,
        passwword: string,
        email: string
    ) {
        this.fullName = fullName;
        this.username = username;
        this.passwword = passwword;
        this.email = email;
    }
}
