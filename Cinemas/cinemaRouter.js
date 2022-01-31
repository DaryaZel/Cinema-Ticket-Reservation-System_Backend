import express from 'express';
import CinemaController from './cinemaController.js';

const router = express.Router();
router.route('/').get(CinemaController.getAllCinemas).post(CinemaController.createCinema);
router.get('/:id', CinemaController.getCinema);

export default router;
