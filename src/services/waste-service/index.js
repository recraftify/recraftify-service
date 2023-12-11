const WasteRepository = require('../../repositories/waste-repository');
const { uploadImage } = require('../../utils/storage');
const MLService = require('../../clients/ml-service');

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
    static async scanWaste(image) {
        const image_buffer = image[0];
        const imageUrl = await uploadImage(image_buffer);
        const response = await MLService.predictWaste(imageUrl);
        return {
            message: 'Scanning waste successful',
            data: response,
        };
    }
}

module.exports = WasteService;
