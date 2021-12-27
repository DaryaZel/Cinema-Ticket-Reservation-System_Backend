import express from 'express';
import Controller from './authorizationController.js';
import { check } from 'express-validator';
import { roleMiddleware } from './middleware/roleMiddleware.js';

const router = express.Router();
router.post('/signup', [
    check('username', 'No empty').notEmpty(),
    check('password', 'Length 4-10').isLength({ min: 4, max: 10 })
], Controller.signup);
router.post('/login', Controller.login);
router.get('/roles', Controller.makeRoles);
router.get('/users', roleMiddleware(['Admin']), Controller.getUsers);

export default router;
