import express from 'express';
import SeatController from './seatsController.js';

const router = express.Router();
router.post('/', SeatController.createSeat);
router.put('/addSelect', SeatController.makeSelectTrue);
router.put('/removeSelect', SeatController.makeSelectFalse);
router.put('/reserve', SeatController.reserveSeat);

export default router;
