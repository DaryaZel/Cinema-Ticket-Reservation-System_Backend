import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}
