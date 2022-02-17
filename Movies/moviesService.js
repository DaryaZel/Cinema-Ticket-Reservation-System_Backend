import Movie from './moviesModel.js';
import MovieSession from '../MovieSessions/movieSessionModel.js';
import { movieSample } from './helpers/MovieAggregationHelpers.js';

class MovieService {

    async createMovie(movie) {
        const createdMovie = await Movie.create(movie);
        return createdMovie;
    }

    async getAllMovies(params) {
        let movieSessions = await MovieSession.aggregate(movieSample());
        let filteredMovieSessions = movieSessions.filter(elem => elem.cityName === params.city)
        if (params.date) {
            filteredMovieSessions = filteredMovieSessions.filter(elem => new Date(elem.date).toLocaleDateString('en-US', { timeZone: params.timezone }) === new Date(params.date).toLocaleDateString('en-US', { timeZone: params.timezone }))
        }
        if (params.cinema) {
            filteredMovieSessions = filteredMovieSessions.filter(elem => elem.cinemaName === params.cinema)
        }
        const foundMovies = filteredMovieSessions.reduce((newArray, item) => {
            if (!newArray.find((newArrayItem) => newArrayItem.movie_id.toString() === item.movie_id.toString())) {
                newArray.push(item);
            }
            return newArray;
        }, []);
        
        return foundMovies;
    }

    async getMovie(id) {
        const foundMovie = await Movie.findById(id);
        return foundMovie;
    }
}
export default new MovieService();
