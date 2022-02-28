import express from 'express';
import MovieSessionsController from './movieSessionController.js';

const router = express.Router();
router.route('/').get(MovieSessionsController.getSessionsCalender).post(MovieSessionsController.createSession);
router.get('/:id', MovieSessionsController.getSession);

export default router;
