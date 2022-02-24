import SessionsPricesService from './sessionsPricesService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class SessionsPricesController {
    async createSessionPrices(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const sessionPrice = await SessionsPricesService.createSessionPrices(req.body);
            return res.json(sessionPrice);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAllSessionPrices(req, res) {
        try {
            const movieSessionId =req.query.movieSessionId;
            if (!movieSessionId) {
                throw new BadRequestParametersError('Movie session Id not specified');
            }
            const seatTypes = await SessionsPricesService.getAllSessionPrices(movieSessionId);
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
export default new SessionsPricesController();
