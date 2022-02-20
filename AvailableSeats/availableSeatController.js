import AvailableSeatService from './availableSeatService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class AvailableSeatController {
    async createAvailableSeat(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const AvailableSeats = await AvailableSeatService.createAvailableSeat(req.body);
            return res.json(availableSeats);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAllAvailableSeats(req, res) {
        try {
            const movieSessionId =req.query.movieSessionId;
            if (isEmpty(movieSessionId)) {
                throw new BadRequestParametersError('Movie session Id not specified');
            }
            const availableSeat = await AvailableSeatService.getAllAvailableSeats(movieSessionId);
            return res.json(availableSeat);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async makeSelectTrue(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Please, choose seats for reservation!');
            }
            const notAvailableSeat = await AvailableSeatService.makeSelectTrue(req.body);
            return res.json(notAvailableSeat);
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
    async makeSelectFalse(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const seat = await AvailableSeatService.makeSelectFalse(req.body);
            return res.json(seat);
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
    async reserveSeat(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const seat = await AvailableSeatService.reserveSeat(req.body);
            return res.json(seat);
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
}
export default new AvailableSeatController();
