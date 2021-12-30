import MovieSession from './movieSessionModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(movieSession) {
        const createdMovieSession = await MovieSession.create(movieSession);
        return createdMovieSession;
    }
    async getAll() {
        const foundMovieSession = await MovieSession.find();
        return foundMovieSession;
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
