import express from 'express';
import ScheduleController from './scheduleController.js';

const router = express.Router();
router.get('/', ScheduleController.getScheduleForAllMovies);
router.get('/:id', ScheduleController.getScheduleForMovie);

export default router;
