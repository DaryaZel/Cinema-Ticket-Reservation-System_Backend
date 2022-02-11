import SeatType from './seatTypesModel.js';
import mongoose from 'mongoose';

class SeatTypesService {

    async createSeatType(seatType) {
        const createdSeatType = await SeatType.create(seatType);
        return createdSeatType;
    }

    async getAllSeatTypes(movieSessionId) {
        const movieSessionObjectId = mongoose.Types.ObjectId(movieSessionId);
        const seatTypesArray = await SeatType.find({session_id: movieSessionObjectId});
        return seatTypesArray;
    }

}

export default new SeatTypesService();
