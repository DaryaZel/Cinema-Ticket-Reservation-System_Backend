import Service from './cinemaService.js';
import { RequestError } from '../Errors/RequestError.js';

class Controller {
    async create(req, res) {
        try {
            const cinema = await Service.create(req.body);
            return res.json(cinema);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const city = req.query.city;
            const cinemas = await Service.getAll(city);
            return res.json(cinemas);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const cinema = await Service.getOne(req.params.id);
            return res.json(cinema);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const cinema = await Service.update(req.body);
            return res.json(cinema);
        }
        catch (error) {
            if (error instanceof RequestError) {
                return res.status(400).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async delete(req, res) {
        try {
            const cinema = await Service.delete(req.params.id);
            return res.json(cinema);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
