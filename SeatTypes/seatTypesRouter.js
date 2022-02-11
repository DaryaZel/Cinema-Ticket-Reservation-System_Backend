import express from 'express';
import SeatTypesController from './seatTypesController.js';

const router = express.Router(); 

router.route('/').post(SeatTypesController.createSeatType).get(SeatTypesController.getAllSeatTypes);

export default router;
