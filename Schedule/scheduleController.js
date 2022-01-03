import Service from './scheduleService.js';

class Controller {
    async getAll(req, res) {
        try {
            const city = req.query.city;
            const cinema = req.query.cinema;
            const date = req.query.date;
            const schedule = await Service.getAll(city, cinema, date);
            return res.json(schedule);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
