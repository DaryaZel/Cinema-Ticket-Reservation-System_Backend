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
            const movies = await MovieService.getAllMovies();
            return res.json(movies);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }

    async getMovie(req, res) {
        try {
            const movieId = req.params.id;
            if (!movieId) {
                throw new BadRequestParametersError('Movie Id not specified');
            }
            const movie = await MovieService.getMovie(movieId);
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
