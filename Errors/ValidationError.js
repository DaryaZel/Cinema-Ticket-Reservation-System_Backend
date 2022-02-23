import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    constructor(message, fieldsErrors) {
        super(message, 400);
        this.fieldsErrors = fieldsErrors;
    };

    asJSON() {
        let formErrorsObj = {};
        this.fieldsErrors.forEach((error) => {
            formErrorsObj[error.param] = error.msg;
        });
        return formErrorsObj;
    }
}
