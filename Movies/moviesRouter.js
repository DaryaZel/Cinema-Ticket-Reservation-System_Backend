import express from 'express';
import MovieController from './moviesController.js';

const router = express.Router();
router.route('/').get(MovieController.getAllMovies).post(MovieController.createMovie);
router.route('/:id').get(MovieController.getMovie);
router.route('/search').post(MovieController.searchMovies);

export default router;
