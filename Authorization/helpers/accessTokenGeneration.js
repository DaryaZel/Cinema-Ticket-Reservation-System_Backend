import { configDev } from "../../config/config.dev.js";
import { configProd } from "../../config/config.prod.js";
import jwt from 'jsonwebtoken';

export const generateAccessToken = (id, userRoles) => {
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
