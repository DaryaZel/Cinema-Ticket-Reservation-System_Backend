import mongoose from 'mongoose';

const SeatType = new mongoose.Schema({
    seatType: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.model('SeatType', SeatType);
