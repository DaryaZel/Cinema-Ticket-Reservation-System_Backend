import { AppError } from "./AppError.js";

export class RegistrationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
