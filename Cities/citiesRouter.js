import express from 'express';
import CityController from './cityController.js';

const router = express.Router();
router.route('/').get(CityController.getAllCities).post(CityController.createCity);
router.get('/:id', CityController.getCity);

export default router;
