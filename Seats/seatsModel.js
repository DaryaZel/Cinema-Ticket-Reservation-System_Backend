import mongoose from 'mongoose';

const Seat = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall', required: true },
    number: { type: Number, required: true },
    rowNumber: { type: Number, required: true },
    seatType_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatType', required: true }
})

export default mongoose.model('Seat', Seat);
