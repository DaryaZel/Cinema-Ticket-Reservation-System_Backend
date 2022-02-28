import mongoose from 'mongoose';

const CinemaHall = new mongoose.Schema({
    cinemaHallName: { type: String, required: true }
})

export default mongoose.model('CinemaHall', CinemaHall)
