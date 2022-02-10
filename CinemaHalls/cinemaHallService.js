import CinemaHall from './cinemaHallModel.js';
import { RequestError } from '../Errors/RequestError.js';

class CinemaHallService {

    async createHall(cinemaHall) { 
        const createdCinemaHall = await CinemaHall.create(cinemaHall);
        return createdCinemaHall;
    }

    async getHall(id) { 
        const foundCinemaHall = await CinemaHall.findById(id);
        return foundCinemaHall;
    }

}

export default new CinemaHallService();
