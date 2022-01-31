import Seat from './seatsModel.js';
import { RequestError } from '../Errors/RequestError.js';

class SeatService {
    async createSeat(seat) {
        const createdSeat = await Seat.create(seat);
        return createdSeat;
    }
    async makeSelectTrue(seat) {
        const foundSeat = await Seat.findById(seat._id);
        if (foundSeat.isSelected === true) {
            throw new RequestError('Sorry, this seat is already selected. Try again in 5 min');
        }
        const updatedSeat = await Seat.findByIdAndUpdate(seat._id, { isSelected: true });
        setTimeout(async () => { await Seat.findByIdAndUpdate(seat._id, { isSelected: false }) }, 50000)
        return updatedSeat;
    }
    async makeSelectFalse(seat) {
        const updatedSeat = await Seat.findByIdAndUpdate(seat._id, { isSelected: false });
        return updatedSeat;
    }
    async reserveSeat(seats) {
        seats.forEach(async (seat) => {
            seat.isSelected = true
            seat.isReserved = true
            await Seat.findByIdAndUpdate(seat._id, seat);
        })
        const foundSeats = await Seat.find();
        return foundSeats

    }
}
export default new SeatService();
