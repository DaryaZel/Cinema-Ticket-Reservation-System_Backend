import express from 'express';
import AuthorizationController from './authorizationController.js';
import { check } from 'express-validator';
import { checkUserAccess } from './middleware/checkUserAccessMiddleware.js';

const router = express.Router();
router.post('/signup', [
    check('username', 'Fill in username field').notEmpty(),
    check('email', 'Fill in email field').notEmpty(),
    check('password', 'Fill in password field, password must be at least 4 and no more than 10 symbols').isLength({ min: 4, max: 10 })
], AuthorizationController.signup);
router.post('/login', AuthorizationController.login);
router.get('/user', checkUserAccess(['Admin', 'User']), AuthorizationController.getUser);

export default router;
