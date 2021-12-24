import Movie from './moviesModel.js';

class Service {
    async create(movie) {
        const createdMovie = await Movie.create(movie);
        return createdMovie;
    }
    async getAll() {
        const foundMovies = await Movie.find();
        return foundMovies;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('Id не указан');
        }
        const foundMovie = await Movie.findById(id);
        return foundMovie;
    }
    async update(movie) {
        if (!movie._id) {
            throw new Error('Id не указан');
        }
        const updatedMovie = await Movie.findByIdAndUpdate(movie._id, movie, { new: true });
        return updatedMovie;
    }
    async delete(id) {
        if (!id) {
            throw new Error('Id не указан');
        }
        const deletedMovie = await Movie.findByIdAndDelete(id);
        return deletedMovie;
    }
}
export default new Service();
