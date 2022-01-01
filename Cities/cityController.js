import Service from './cityService.js';
import { RequestError } from '../Errors/RequestError.js';

class Controller {
    async create(req, res) {
        try {
            const city = await Service.create(req.body);
            return res.json(city);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const cities = await Service.getAll();
            return res.json(cities);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const city = await Service.getOne(req.params.id);
            return res.json(city);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const city = await Service.update(req.body);
            return res.json(city);
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
            const city = await Service.delete(req.params.id);
            return res.json(city);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
