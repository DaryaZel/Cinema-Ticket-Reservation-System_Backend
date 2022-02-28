import CityService from './cityService.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';
import { AppError } from '../Errors/AppError.js';
import { isEmpty } from '../util/isEmptyObj.js';

class CityController {

    async createCity(req, res) {
        try {
            if (isEmpty(req.body)) {
                throw new BadRequestParametersError('Request body is empty');
            }
            const city = await CityService.createCity(req.body);
            return res.json(city);
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

    async getAllCities(req, res) {
        try {
            const cities = await CityService.getAllCities();
            return res.json(cities);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }

    async getCity(req, res) {
        try {
            const cityId = req.params.id;
            if (!cityId) {
                throw new BadRequestParametersError('City Id not specified');
            }
            const city = await CityService.getCity(cityId);
            return res.json(city);
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

export default new CityController();
