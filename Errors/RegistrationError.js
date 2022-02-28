import { AppError } from "./AppError.js";

export class RegistrationError extends AppError {
    constructor(field, message) {
        super(message, 400);
        this.field = field;
    }

    asJSON() {
        let formErrorsObj = {};
        formErrorsObj[this.field]=this.message;
        return formErrorsObj;
    }
}
