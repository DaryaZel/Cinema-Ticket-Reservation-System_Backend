import { AppError } from "./AppError.js";

export class RequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
