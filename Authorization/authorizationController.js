import AuthorizationService from './authorizationService.js';
import { validationResult } from 'express-validator';
import { ValidationError } from '../Errors/ValidationError.js';
import { AuthenticationError } from '../Errors/AuthenticationError.js';
import { RegistrationError } from '../Errors/RegistrationError.js';
import { AppError } from '../Errors/AppError.js';
import { decodedAccessToken } from './helpers/accessTokenDecoding.js';
import { generateAccessToken } from './helpers/accessTokenGeneration.js';
import { isEmpty } from '../util/isEmptyObj.js';


class AuthorizationController {

    async signup(req, res) {
        try {
            const validations = validationResult(req);
            const errorsArray = validations.errors;
            if (!isEmpty(errorsArray)) {
                throw new ValidationError('Sign Up form validation failed', errorsArray)
            }
            const user = await AuthorizationService.signup(req.body);
            const token = generateAccessToken(user._id, user.roles);
            return res.json(token);
        }
        catch (error) {
            if ((error instanceof ValidationError) || (error instanceof RegistrationError)) {
                return res.status(error.statusCode).json(error.asJSON());
            }
            else if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }

    async login(req, res) {
        try {
            const user = await AuthorizationService.login(req.body);
            const token = generateAccessToken(user._id, user.roles);
            return res.json(token);
        }
        catch (error) {
            if ((error instanceof AuthenticationError)) {
                return res.status(error.statusCode).json(error.asJSON());
            }
            else if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }

    async getUser(req, res) {
        try {
            const userId = decodedAccessToken(req)
            const user = await AuthorizationService.getUser(userId);
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new AuthorizationController();
