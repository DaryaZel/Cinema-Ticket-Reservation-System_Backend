import Service from './authorizationService.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { ValidationError } from '../Errors/ValidationError.js';
import { AppError } from '../Errors/AppError.js';
import { configDev } from "../config/config.dev.js";
import { configProd } from "../config/config.prod.js";

const generateAccessToken = (id, userRoles) => {
    const EXPIRES_IN_PROD = configProd.EXPIRES_IN;
    const EXPIRES_IN_DEV = configDev.EXPIRES_IN;
    const payload = {
        id,
        userRoles
    };
    return jwt.sign(payload,
        process.env.SECRET_KEY_RANDOM,
        { expiresIn: process.env.NODE_ENV === "production" ? EXPIRES_IN_PROD : EXPIRES_IN_DEV }
    )
}
const decodedAccessToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, secret.secretKey);
    const userId = user.id;
    return userId;
}

class Controller {
    async signup(req, res) {
        try {
            const validations = validationResult(req);
            const errorsArray = validations.errors;
            if (errorsArray.length !== 0) {
                if (errorsArray.length === 1 && errorsArray[0].param === 'username') {
                    throw new ValidationError("Fill in username field");
                }
                else if (errorsArray.length === 1 && errorsArray[0].param === 'password') {
                    throw new ValidationError("Fill in password field, password must be at least 4 and no more than 10 symbols");
                }
                else {
                    throw new ValidationError("Fill in all fields, password must be at least 4 and no more than 10 symbols");
                }
            }
            const user = await Service.signup(req.body);
            return res.json(user);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async login(req, res) {
        try {
            const user = await Service.login(req.body);
            const token = generateAccessToken(user._id, user.roles);
            return res.json(token);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async makeRoles(req, res) {
        try {
            await Service.makeRoles();
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getUser(req, res) {
        try {
            const userId = decodedAccessToken(req)
            const user = await Service.getUser(userId);
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
