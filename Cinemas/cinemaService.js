import Cinema from './cinemaModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(cinema) {
        const createdCinema = await Cinema.create(cinema);
        return createdCinema;
    }
    async getAll() {
        const foundCinema = await Cinema.find();
        return foundCinema;
    }
    async getOne(id) {
        const foundCinema = await Cinema.findById(id);
        return foundCinema;
    }
    async update(cinema) {
        if (!cinema._id) {
            throw new RequestError('Id not specified');
        }
        const updatedCinema = await Cinema.findByIdAndUpdate(cinema._id, cinema, { new: true });
        return updatedCinema;
    }
    async delete(id) {
        const deletedCinema = await Cinema.findByIdAndDelete(id);
        return deletedCinema;
    }
}
export default new Service();
