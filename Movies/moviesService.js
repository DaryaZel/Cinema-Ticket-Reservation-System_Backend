import Movie from './moviesModel.js';
import MovieSession from '../MovieSessions/movieSessionModel.js';
import { movieSample, sessionsCalenderSample } from './helpers/MovieAggregationHelpers.js';
import mongoose from 'mongoose';

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
    async searchMovies(searchText) {
        let payload=searchText.payload.trim();
        if(!payload){
            return null
        }
        let searchResult = await Movie.find({movieName:{$regex: new RegExp('^'+payload+'.*','i')}}).exec();
        searchResult=searchResult.slice(0, 5)
        return searchResult;
    }

    async getMovie(movieId, timeZone) {
        const movieObjectId = mongoose.Types.ObjectId(movieId);
        const movieInformation = await Movie.findById(movieId);
        const daysArray = await MovieSession.aggregate(sessionsCalenderSample(timeZone, movieObjectId));
        const sortedDaysArray = daysArray[0].days.sort();
        const release_day = sortedDaysArray[0];
        const last_day = sortedDaysArray[sortedDaysArray.length - 1];
        return { movieInformation, release_day, last_day };
    }
}
export default new MovieService();
