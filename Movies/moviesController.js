import MovieService from './moviesService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class MovieController {

    async createMovie(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const movie = await MovieService.createMovie(req.body);
            return res.json(movie);
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

    async getAllMovies(req, res) {
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
            const movies = await MovieService.getAllMovies(params);
            return res.json(movies);
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

    async getMovie(req, res) {
        try {
            const movieId = req.params.id;
            const timeZone = req.query.timeZone;
            if (!movieId) {
                throw new BadRequestParametersError('Movie Id not specified');
            }
            const movie = await MovieService.getMovie(movieId, timeZone);
            return res.json(movie);
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

export default new MovieController();
