import MovieSession from './movieSessionModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(movieSession) {
        const createdMovieSession = await MovieSession.create(movieSession);
        return createdMovieSession;
    }
    async getSessionsCalenderArray() {
        const daysArray = await MovieSession.aggregate([
            {
                $group: {
                    _id: null,
                    days: { $addToSet: { $dateToString: { date: "$date", format: "%m/%d/%Y", timezone: 'Europe/Moscow' } } }
                }
            }
        ])
        return daysArray[0].days.sort();
    }
    async getOne(id) {
        const foundMovieSession = await MovieSession.findById(id);
        return foundMovieSession;
    }
    async update(movieSession) {
        if (!movieSession._id) {
            throw new RequestError('Id not specified');
        }
        const updatedMovieSession = await MovieSession.findByIdAndUpdate(movieSession._id, movieSession, { new: true });
        return updatedMovieSession;
    }
    async delete(id) {
        const deletedMovieSession = await MovieSession.findByIdAndDelete(id);
        return deletedMovieSession;
    }
}
export default new Service();
