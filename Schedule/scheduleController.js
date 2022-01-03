import Service from './scheduleService.js';

class Controller {
    async getAll(req, res) {
        try {
            const city = req.query.city;
            const cinema = req.query.cinema;
            const schedule = await Service.getAll(city, cinema);
            return res.json(schedule);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
