export const decodedAccessToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, secret.secretKey);
    const userId = user.id;
    return userId;
}
