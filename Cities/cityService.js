import City from './cityModel.js';
import { RequestError } from '../Errors/RequestError.js';

class Service {
    async create(city) {
        const createdCity = await City.create(city);
        return createdCity;
    }
    async getAll() {
        const foundCity = await City.find();
        return foundCity;
    }
    async getOne(id) {
        const foundCity = await City.findById(id);
        return foundCity;
    }
    async update(city) {
        if (!city._id) {
            throw new RequestError('Id not specified');
        }
        const updatedCity = await City.findByIdAndUpdate(city._id, city, { new: true });
        return updatedCity;
    }
    async delete(id) {
        const deletedCity = await City.findByIdAndDelete(id);
        return deletedCity;
    }
}
export default new Service();
