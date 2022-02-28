import SessionPrices from './sessionsPricesModel.js';
import mongoose from 'mongoose';

class SessionsPricesService {

    async createSessionPrices(sessionPrice) {
        const createdSessionPrices = await SessionPrices.create(sessionPrice);
        return createdSessionPrices;
    }

    async getAllSessionPrices(movieSessionId) {
        const movieSessionObjectId = mongoose.Types.ObjectId(movieSessionId);
        const sessionPricesArray = await SessionPrices.aggregate([
            { $match: { session_id: movieSessionObjectId } },
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
        ]);
        return sessionPricesArray;
    }

}

export default new SessionsPricesService();
