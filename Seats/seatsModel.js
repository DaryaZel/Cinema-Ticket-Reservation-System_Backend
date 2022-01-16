import mongoose from 'mongoose';

const Seat = new mongoose.Schema({
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall', required: true },
    number: { type: Number, required: true },
    rowNumber: { type: Number, required: true },
    type: { type: String, required: true },
    tooltip: { type: String, required: true },
    reserved: { type: Boolean, required: true },
    temporaryReserved: { type: Boolean, required: true }
})

export default mongoose.model('Seat', Seat)
