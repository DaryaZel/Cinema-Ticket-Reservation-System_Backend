import jwt from 'jsonwebtoken';
import { secret } from '../config.js';
import { ForbiddenError } from '../../Errors/ForbiddenError.js';
import { AppError } from '../../Errors/AppError.js';

export function roleMiddleware(roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw new ForbiddenError('User is not authorized');
            }
            const { roles: userRoles } = jwt.verify(token, secret.secretKey)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                    throw new ForbiddenError('You do not have an access');
                }
            next();
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(403).json({ message: "User is not authorized" });
            }
        }
    }
};
