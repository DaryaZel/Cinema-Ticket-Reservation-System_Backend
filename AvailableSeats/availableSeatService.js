import AvailableSeat from './availableSeatModel.js';
import { RequestError } from '../Errors/RequestError.js';
import mongoose from 'mongoose';

class AvailableSeatService {
    async createAvailableSeat(seat) {
        const createdSeat = await AvailableSeat.create(seat);
        return createdSeat;
    }
    async getAllAvailableSeats(movieSessionId) {
        const movieSessionObjectId = mongoose.Types.ObjectId(movieSessionId)
        const availableSeats = await AvailableSeat.aggregate([
            { $match: { session_id: movieSessionObjectId } },
            {
                $lookup: {
                    from: "seats",
                    localField: "seat_id",
                    foreignField: "_id",
                    as: "seat"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$seat", 0] }, "$$ROOT"] } }
            },
            { $project: { seat: 0 } }]).sort({ rowNumber: 1, number: 1 });
        return availableSeats;
    }
    async makeSelectTrue(seat) {
        const foundSeat = await AvailableSeat.findById(seat.seat_id);
        if (foundSeat.isSelected === true) {
            throw new RequestError('Sorry, this seat is already selected. Try again in 5 min');
        }
        const updatedSeat = await AvailableSeat.findByIdAndUpdate(foundSeat, { isSelected: true });
        setTimeout(async () => { await AvailableSeat.findByIdAndUpdate(foundSeat, { isSelected: false }) }, 50000)
        return updatedSeat;
    }
    async makeSelectFalse(seat) {
        const foundSeat = await AvailableSeat.findById(seat.seat_id);
        const updatedSeat = await AvailableSeat.findByIdAndUpdate(foundSeat, { isSelected: false });
        return updatedSeat;
    }
    async reserveSeat(seats) {
        seats.forEach(async (seat) => {
            seat.isSelected = true
            seat.isReserved = true
            await Seat.findByIdAndUpdate(seat._id, seat);
        })
        const foundSeats = await AvailableSeat.find();
        return foundSeats

    }
}
export default new AvailableSeatService();
