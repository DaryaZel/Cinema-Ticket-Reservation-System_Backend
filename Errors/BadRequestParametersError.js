import { AppError } from "./AppError.js";

export class BadRequestParametersError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
