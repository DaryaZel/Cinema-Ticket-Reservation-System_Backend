import express from 'express';
import Controller from './scheduleController.js';

const router = express.Router();
router.get('/', Controller.getAll);

export default router;
