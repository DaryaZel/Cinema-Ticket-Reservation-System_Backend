import mongoose from 'mongoose';

const AvailableSeat = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieSession', required: true },
    seat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
    isSelected: { type: Boolean, required: true },
})

export default mongoose.model('AvailableSeat', AvailableSeat)
