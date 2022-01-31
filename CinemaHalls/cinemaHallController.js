import CinemaHallService from './cinemaHallService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class CinemaHallController {

    async createHall(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const cinemaHall = await CinemaHallService.createHall(req.body);
            return res.json(cinemaHall);
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

    async getHall(req, res) {
        try {
            const cinemaHallId = req.params.id;
            if (!cinemaHallId) {
                throw new BadRequestParametersError('Cinema hall Id not specified');
            }
            const cinemaHall = await CinemaHallService.getOne(cinemaHallId);
            return res.json(cinemaHall);
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

export default new CinemaHallController();
