import express from 'express';
import Controller from './moviesController.js';

const router = express.Router();
router.route('/').get(Controller.getAll).post(Controller.create).put(Controller.update);
router.route('/:id').get(Controller.getOne).delete(Controller.delete);

export default router;
