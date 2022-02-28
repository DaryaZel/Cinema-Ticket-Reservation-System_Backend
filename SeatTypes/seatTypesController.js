import SeatTypesService from './seatTypesService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class SeatTypesController {
    async createSeatType(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const seatType = await SeatTypesService.createSeatType(req.body);
            return res.json(seatType);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAllSeatTypes(req, res) {
        try {
            const movieSessionId =req.query.movieSessionId;
            if (!movieSessionId) {
                throw new BadRequestParametersError('Movie session Id not specified');
            }
            const seatTypes = await SeatTypesService.getAllSeatTypes(movieSessionId);
            return res.json(seatTypes);
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
export default new SeatTypesController();
