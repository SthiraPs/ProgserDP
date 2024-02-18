export class ResponseModel {
    success: boolean;
    message: string;
    error: string;

    constructor(
        success: boolean,
        message: string,
        error: string,
        email: string
    ) {
        this.success = success;
        this.message = message;
        this.error = error;
    }
}
