import mongoose from 'mongoose';

const MovieSession = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    hall_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaHall', required: true },
    date: { type: String, required: true }
})

export default mongoose.model('MovieSession', MovieSession)
