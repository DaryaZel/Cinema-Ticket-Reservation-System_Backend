import express from 'express';
import ImagesController from './imagesController.js';

const router = express.Router();
router.post('/upload', ImagesController.upload);

export default router;

