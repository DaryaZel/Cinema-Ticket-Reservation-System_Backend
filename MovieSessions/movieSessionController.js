import Service from './movieSessionService.js';
import { RequestError } from '../Errors/RequestError.js';

class Controller {
    async create(req, res) {
        try {
            const movieSession = await Service.create(req.body);
            return res.json(movieSession);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getSessionsCalenderArray(req, res) {
        try {
            const timeZoneParam = req.query.timeZone;
            const movieSessions = await Service.getSessionsCalenderArray(timeZoneParam);
            return res.json(movieSessions);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const movieSession = await Service.getOne(req.params.id);
            return res.json(movieSession);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async update(req, res) {
        try {
            const movieSession = await Service.update(req.body);
            return res.json(movieSession);
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
            const movieSession = await Service.delete(req.params.id);
            return res.json(movieSession);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
