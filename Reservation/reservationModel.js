import mongoose from 'mongoose';

const Reservation = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieSession', required: true },
    ticketsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true})

export default mongoose.model('Reservation', Reservation)
