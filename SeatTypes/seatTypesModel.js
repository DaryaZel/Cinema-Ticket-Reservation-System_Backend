import mongoose from 'mongoose';

const SeatType = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieSession', required: true },
    seatType: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
})

export default mongoose.model('SeatType', SeatType);
