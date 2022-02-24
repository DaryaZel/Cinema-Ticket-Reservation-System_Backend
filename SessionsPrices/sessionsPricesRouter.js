import express from 'express';
import SessionsPricesController from './sessionsPricesController.js';

const router = express.Router(); 

router.route('/').post(SessionsPricesController.createSessionPrices).get(SessionsPricesController.getAllSessionPrices);

export default router;
