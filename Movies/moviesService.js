import Movie from './moviesModel.js';

class MovieService {

    async createMovie(movie) {
        const createdMovie = await Movie.create(movie);
        return createdMovie;
    }

    async getAllMovies() {
        const foundMovies = await Movie.find();
        return foundMovies;
    }

    async getMovie(id) {
        const foundMovie = await Movie.findById(id);
        return foundMovie;
    }
}
export default new MovieService();
