import Service from './seatsService.js';
import { RequestError } from '../Errors/RequestError.js';

class Controller {
    async create(req, res) {
        try {
            const seat = await Service.create(req.body);
            return res.json(seat);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const seats = await Service.getAll();
            return res.json(seats);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const seat = await Service.getOne(req.params.id);
            return res.json(seat);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async addSelect(req, res) {
        try {
            const seat = await Service.addSelect(req.body);
            return res.json(seat);
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
    async removeSelect(req, res) {
        try {
            const seat = await Service.removeSelect(req.body);
            return res.json(seat);
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
            const seat = await Service.delete(req.params.id);
            return res.json(seat);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
