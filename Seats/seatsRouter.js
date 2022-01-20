import express from 'express';
import Controller from './seatsController.js';

const router = express.Router();
router.get('/', Controller.getAll);
router.get('/:id', Controller.getOne);
router.post('/', Controller.create);
router.put('/addSelect', Controller.addSelect);
router.put('/removeSelect', Controller.removeSelect);
router.put('/reserve', Controller.reserve);
router.delete('/:id', Controller.delete);

export default router;
