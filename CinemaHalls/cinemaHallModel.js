import mongoose from 'mongoose';

const CinemaHall = new mongoose.Schema({
    cinemaHallName: { type: String, required: true },
    capacity: { type: Number, required: true }
})

export default mongoose.model('CinemaHall', CinemaHall)
