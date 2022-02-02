import express from 'express';
import AvailableSeatController from './availableSeatController.js';

const router = express.Router();
router.route('/').get(AvailableSeatController.getAllAvailableSeats).post(AvailableSeatController.createAvailableSeat);
router.put('/addSelect', AvailableSeatController.makeSelectTrue);
router.put('/removeSelect', AvailableSeatController.makeSelectFalse);
router.put('/reserve', AvailableSeatController.reserveSeat);

export default router;
