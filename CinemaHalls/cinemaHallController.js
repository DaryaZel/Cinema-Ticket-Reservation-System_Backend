import Service from './cinemaHallService.js';
import { RequestError } from '../Errors/RequestError.js';

class Controller {
    async create(req, res) {
        try {
            const cinemaHall = await Service.create(req.body);
            return res.json(cinemaHall);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const cinemaHalls = await Service.getAll();
            return res.json(cinemaHalls);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const cinemaHall = await Service.getOne(req.params.id);
            return res.json(cinemaHall);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const cinemaHall = await Service.update(req.body);
            return res.json(cinemaHall);
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
            const cinemaHall = await Service.delete(req.params.id);
            return res.json(cinemaHall);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
