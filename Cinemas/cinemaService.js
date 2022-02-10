import Cinema from './cinemaModel.js';
import { cinemaSample } from './helpers/cinemaAggregationHelpers.js';

class CinemaService {

  async createCinema(cinema) {
    const createdCinema = await Cinema.create(cinema);
    return createdCinema;
  }

  async getAllCinemas(city) {
    let cinemas = await Cinema.aggregate(cinemaSample())
    let filteredCinemas = cinemas.filter(elem => elem.cityName === city)
    return filteredCinemas;
  }

  async getCinema(id) {
    const foundCinema = await Cinema.findById(id);
    return foundCinema;
  }
}

export default new CinemaService();
