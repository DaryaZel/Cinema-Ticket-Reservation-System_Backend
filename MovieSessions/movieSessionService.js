import MovieSession from './movieSessionModel.js';
import { sessionsCalenderSample, movieSessionSample } from './helpers/MovieSessionAggregationHelpers.js';
import mongoose from 'mongoose';

class MovieSessionsService {

    async createSession(movieSession) {
        const createdMovieSession = await MovieSession.createSession(movieSession);
        return createdMovieSession;
    }

    async getSessionsCalender(timeZone) {
        const daysArray = await MovieSession.aggregate(sessionsCalenderSample(timeZone));
        return daysArray[0].days.sort();
    }

    async getSession(id) {
        let movieSessionObjectId = mongoose.Types.ObjectId(id)
        const foundMovieSession = await MovieSession.aggregate(movieSessionSample(movieSessionObjectId))
        return foundMovieSession;
    }
}

export default new MovieSessionsService();
