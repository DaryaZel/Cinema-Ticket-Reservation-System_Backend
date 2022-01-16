import Seat from './seatsModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(seat) {
        const createdSeat = await Seat.create(seat);
        return createdSeat;
    }
    async getAll() {
        const foundSeat = await Seat.find();
        return foundSeat;
    }
    async getOne(id) {
        const foundSeat = await Seat.findById(id);
        return foundSeat;
    }
    async update(seat) {
        if (!seat._id) {
            throw new RequestError('Id not specified');
        }
        const updatedSeat = await Seat.findByIdAndUpdate(seat._id, seat, { new: true });
        return updatedSeat;
    }
    async delete(id) {
        const deletedSeat = await Seat.findByIdAndDelete(id);
        return deletedSeat;
    }
}
export default new Service();
