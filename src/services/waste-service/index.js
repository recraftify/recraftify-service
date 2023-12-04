const WasteRepository = require('../../repositories/waste-repository');

class WasteService {
    static async getWaste() {
        const waste = await WasteRepository.getAllWaste();
        return {
            message: 'Fetching waste successful',
            data: waste,
        };
    }
    static async getWasteById(id) {
        const waste = await WasteRepository.getWasteById(id);
        return {
            message: `Fetching waste with id ${id} successful`,
            data: waste,
        };
    }
}

module.exports = WasteService;
