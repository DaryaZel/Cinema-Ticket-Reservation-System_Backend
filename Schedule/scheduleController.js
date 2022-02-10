import ScheduleService from './scheduleService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';

class ScheduleController {

    async getScheduleForAllMovies(req, res) {
        try {
            const params = {
                city: req.query.city,
                cinema: req.query.cinema,
                date: req.query.date,
                timezone: req.query.timeZone
            }
            if (!params.city) {
                throw new BadRequestParametersError('City parameter not specified');
            }
            if (!params.timezone) {
                throw new BadRequestParametersError('Timezone parameter not specified');
            }
            const schedule = await ScheduleService.getScheduleForAllMovies(params);
            return res.json(schedule);
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

    async getScheduleForMovie(req, res) {
        try {
            const params = {
                movieId: req.params.id,
                city: req.query.city,
                cinema: req.query.cinema,
                date: req.query.date,
                timezone: req.query.timeZone
            }
            if (!params.movieId) {
                throw new BadRequestParametersError('Movie Id parameter not specified');
            }
            if (!params.city) {
                throw new BadRequestParametersError('City parameter not specified');
            }
            if (!params.timezone) {
                throw new BadRequestParametersError('Timezone parameter not specified');
            }
            const movieSchedule = await ScheduleService.getScheduleForMovie(params);
            return res.json(movieSchedule);
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

export default new ScheduleController();
