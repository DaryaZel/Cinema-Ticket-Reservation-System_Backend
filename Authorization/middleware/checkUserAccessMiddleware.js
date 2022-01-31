import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../../Errors/ForbiddenError.js';
import { AppError } from '../../Errors/AppError.js';
import { isEmpty } from '../../util/isEmptyObj.js'

export function checkUserAccess(roles) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new ForbiddenError('User is not authorized');
            }

            if (!isEmpty(roles)) {
                const { userRoles } = jwt.verify(token, process.env.SECRET_KEY_RANDOM);

                let hasRole = userRoles.filter(role => roles.includes(role.value)).length !== 0;

                if (!hasRole) {
                    throw new ForbiddenError('You do not have an access');
                }
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
