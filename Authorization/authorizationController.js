import Service from './authorizationService.js';
import { userExistsMessage, userDoesNotExistMessage, passwordIsWrongMessage } from './authorizationService.js';
import { validationResult } from 'express-validator';
const fillAllFieldsMessage = 'Fill in all fields';

class Controller {
    async signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: fillAllFieldsMessage });
            }
            const user = await Service.signup(req.body);
            return res.json(user);
        }
        catch (error) {
            if (error.message == userExistsMessage) {
                res.status(400).json(error.message);
            }
            res.status(500).json(error);
        }
    }
    async login(req, res) {
        try {
            const user = await Service.login(req.body);
            return res.json(user);
        }
        catch (error) {
            if (error.message == userDoesNotExistMessage || error.message == passwordIsWrongMessage) {
                res.status(400).json(error.message);
            }
            res.status(500).json(error);
        }
    }
    async makeRoles(req, res) {
        try {
            await Service.makeRoles();
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new Controller();
