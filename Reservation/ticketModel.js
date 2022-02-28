import mongoose from 'mongoose';

const Ticket = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieSession', required: true },
    availableSeat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailableSeat', required: true },
    availableSeat_row: { type: Number, required: true },
    availableSeat_number: { type: Number, required: true },
    availableSeat_price: { type: Number, required: true }
})

export default mongoose.model('Ticket', Ticket)
