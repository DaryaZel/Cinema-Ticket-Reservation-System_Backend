import jwt from 'jsonwebtoken';

export const decodedAccessToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_KEY_RANDOM);
    const userId = user.id;
    return userId;
}
