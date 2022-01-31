import MovieSession from './movieSessionModel.js';
import { sessionsCalenderSample } from './helpers/MovieSessionAggregationHelpers.js';

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
        const foundMovieSession = await MovieSession.findById(id);
        return foundMovieSession;
    }
}

export default new MovieSessionsService();
