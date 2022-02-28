import mongoose from 'mongoose';

const SessionPrices = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieSession', required: true },
    seatType_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'SeatType', required: true },
    price: { type: Number, required: true }
})

export default mongoose.model('SessionPrices', SessionPrices);
