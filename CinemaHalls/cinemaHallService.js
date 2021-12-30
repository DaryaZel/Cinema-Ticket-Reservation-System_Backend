import CinemaHall from './cinemaHallModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(cinemaHall) {
        const createdCinemaHall = await CinemaHall.create(cinemaHall);
        return createdCinemaHall;
    }
    async getAll() {
        const foundCinemaHall = await CinemaHall.find();
        return foundCinemaHall;
    }
    async getOne(id) {
        const foundCinemaHall = await CinemaHall.findById(id);
        return foundCinemaHall;
    }
    async update(cinemaHall) {
        if (!cinemaHall._id) {
            throw new RequestError('Id not specified');
        }
        const updatedCinemaHall = await CinemaHall.findByIdAndUpdate(cinemaHall._id, cinemaHall, { new: true });
        return updatedCinemaHall;
    }
    async delete(id) {
        const deletedCinemaHall = await CinemaHall.findByIdAndDelete(id);
        return deletedCinemaHall;
    }
}
export default new Service();
