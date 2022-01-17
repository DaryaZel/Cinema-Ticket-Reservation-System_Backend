import CinemaHall from './cinemaHallModel.js';
import Seat from '../Seats/seatsModel.js';

class CinemaHallService {

    async createHall(cinemaHall) { 
        const createdCinemaHall = await CinemaHall.create(cinemaHall);
        return createdCinemaHall;
    }

    async getHall(id) { 
        const foundCinemaHall = await CinemaHall.findById(id);
        const seats = await Seat.find({ hall_id: foundCinemaHall._id }).sort({ rowNumber: 1, number: 1 });
        return { foundCinemaHall, seats };
    }

}

export default new CinemaHallService();
