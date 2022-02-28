import ReservationService from './reservationService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';
import { decodedAccessToken } from '../Authorization/helpers/accessTokenDecoding.js';

class ReservationController {

    async createReservation(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const reservation = await ReservationService.createReservation(req.body);
            return res.json(reservation);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async getUserReservations(req, res) {
        try {
            const userId = decodedAccessToken(req)
            if (!userId) {
                throw new BadRequestParametersError('User Id not specified');
            }
            const reservations = await ReservationService.getReservations(userId);
            return res.json(reservations);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }

}

export default new ReservationController();
