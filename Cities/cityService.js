import City from './cityModel.js';

class CityService {

    async createCity(city) {
        const createdCity = await City.create(city);
        return createdCity;
    }

    async getAllCities() {
        const foundCity = await City.find();
        return foundCity;
    }

    async getCity(id) {
        const foundCity = await City.findById(id);
        return foundCity;
    }
}

export default new CityService();
