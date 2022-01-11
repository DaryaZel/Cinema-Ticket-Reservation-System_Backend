import express from 'express';
import Controller from './imagesController.js';

const router = express.Router();
router.post('/upload', Controller.upload);

export default router;

