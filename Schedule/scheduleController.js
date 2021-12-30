import Service from './scheduleService.js';

class Controller {
    async getAll(req, res) {
        try {
            const schedule = await Service.getAll();
            return res.json(schedule);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
