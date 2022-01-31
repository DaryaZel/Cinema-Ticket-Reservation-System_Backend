import CinemaService from './cinemaService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class CinemaController {

    async createCinema(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const cinema = await CinemaService.createCinema(req.body);
            return res.json(cinema);
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

    async getAllCinemas(req, res) {
        try {
            const city = req.query.city;
            const cinemas = await CinemaService.getAllCinemas(city);
            return res.json(cinemas);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }

    async getCinema(req, res) {
        try {
            const cinemaId = req.params.id;
            if (!cinemaId) {
                throw new BadRequestParametersError('Cinema Id not specified');
            }
            const cinema = await CinemaService.getCinema(cinemaId);
            return res.json(cinema);
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

export default new CinemaController();
