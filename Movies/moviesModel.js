import mongoose from 'mongoose';

const Movie = new mongoose.Schema({
    movieName: { type: String, required: true },
    liveStory: { type: String, required: true }
})

export default mongoose.model('Movie', Movie)
