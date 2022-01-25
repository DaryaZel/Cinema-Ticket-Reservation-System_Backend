import express from 'express';
import Controller from './movieSessionController.js';

const router = express.Router();
router.get('/', Controller.getSessionsCalenderArray);
router.get('/:id', Controller.getOne);
router.post('/', Controller.create);
router.put('/', Controller.update);
router.delete('/:id', Controller.delete);

export default router;
