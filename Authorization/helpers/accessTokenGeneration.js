import { config } from "../../config/config.js";
import jwt from 'jsonwebtoken';

export const generateAccessToken = (id, userRoles) => {
    const payload = {
        id,
        userRoles
    };
    return jwt.sign(payload,
        process.env.SECRET_KEY_RANDOM,
        { expiresIn: config.EXPIRES_IN }
    )
}
