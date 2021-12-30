import mongoose from 'mongoose';

const Cinema = new mongoose.Schema({
    hall_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall', required: true }],
    cinemaName: { type: String, required: true }
})

export default mongoose.model('Cinema', Cinema)
