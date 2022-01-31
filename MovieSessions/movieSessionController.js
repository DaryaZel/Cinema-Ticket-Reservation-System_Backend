import MovieSessionsService from './movieSessionService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class MovieSessionsController {

    async createSession(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const movieSession = await MovieSessionsService.createSession(req.body);
            return res.json(movieSession);
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

    async getSessionsCalender(req, res) {
        try {
            const timeZoneParam = req.query.timeZone;
            if (!timeZoneParam) {
                throw new BadRequestParametersError('Timezone not specified');
            }
            const sessionsCalender = await MovieSessionsService.getSessionsCalender(timeZoneParam);
            return res.json(sessionsCalender);
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

    async getSession(req, res) {
        try {
            const movieSessionId = req.params.id;
            if (!movieSessionId) {
                throw new BadRequestParametersError('Movie session Id not specified');
            }
            const movieSession = await MovieSessionsService.getSession(movieSessionId);
            return res.json(movieSession);
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

export default new MovieSessionsController();
