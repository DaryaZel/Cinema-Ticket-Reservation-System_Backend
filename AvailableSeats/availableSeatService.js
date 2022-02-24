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
            { $project: { seat: 0 } },
            {
                $lookup:
                {
                    from: "sessionprices",
                    let: { session: "$session_id", seattype: "$seatType_id" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$session_id", "$$session"] },
                                            { $eq: ["$seatType_id", "$$seattype"] }
                                        ]
                                }
                            }
                        }
                    ],
                    as: "types"
                }
            }, {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$types", 0] }, "$$ROOT"] } }
            },
            { $project: { types: 0 } },
            {
                $lookup: {
                    from: "seattypes",
                    localField: "seatType_id",
                    foreignField: "_id",
                    as: "seatTypes"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$seatTypes", 0] }, "$$ROOT"] } }
            },
            { $project: { seatTypes: 0 } }
        ]).sort({ rowNumber: 1, number: 1 });
        return availableSeats;
    }
    async makeSelectTrue(seat) {
        const foundSeat = await AvailableSeat.findOne({ session_id: seat.session_id, seat_id: seat.seat_id });
        if (foundSeat.isSelected === true) {
            throw new RequestError('Sorry, this seat is already selected. Try again in 5 min');
        }
        const updatedSeat = await AvailableSeat.findOneAndUpdate({ session_id: seat.session_id, seat_id: seat.seat_id }, { $set: { isSelected: true } }, { new: true });
        return updatedSeat;
    }
    async makeSelectFalse(seat) {
        const updatedSeat = await AvailableSeat.findOneAndUpdate({ session_id: seat.session_id, seat_id: seat.seat_id }, { $set: { isSelected: false } }, { new: true });
        return updatedSeat;
    }
    async reserveSeat(seats) {
        for (let i = 0; i < seats.length; i++) {
            const updatedSeat = await AvailableSeat.findOneAndUpdate({ session_id: seats[i].session_id, seat_id: seats[i].seat_id }, { $set: { isReserved: true } }, { new: true });
        }
        const foundSeats = await AvailableSeat.find();
        return foundSeats;
    }
    async makeAllSelectedSeatsFalse(seats) {
        for (let i = 0; i < seats.length; i++) {
            const updatedSeat = await AvailableSeat.findOneAndUpdate({ session_id: seats[i].session_id, seat_id: seats[i].seat_id }, { $set: { isSelected: false } }, { new: true });
        }
        const foundSeats = await AvailableSeat.find();
        return foundSeats;
    }
}
export default new AvailableSeatService();
