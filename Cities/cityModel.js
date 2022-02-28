import mongoose from 'mongoose';

const City = new mongoose.Schema({
    cityName: { type: String, required: true }
})

export default mongoose.model('City', City)
