import { UserModel } from '../../register/model/user.model';

export class SigninModel {
    user: UserModel;
    authToken: string;

    constructor(user: UserModel, authToken: string) {
        this.user = user;
        this.authToken = authToken;
    }
}
