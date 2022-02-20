import express from 'express';
import ReservationController from './reservationController.js';

const router = express.Router();
router.route('/').get(ReservationController.getUserReservations).post(ReservationController.createReservation);

export default router;
