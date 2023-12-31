const WasteRepository = require('../../repositories/waste-repository');
const { uploadImage } = require('../../utils/storage');
const MLService = require('../../clients/ml-service');

class WasteService {
    static async getWaste() {
        const waste = await WasteRepository.getAllWaste();

        if (!waste) {
            return {
                message: 'Waste not found',
                data: null,
            };
        }
        return {
            message: 'Fetching waste successful',
            data: waste,
        };
    }
    static async getWasteById(id) {
        const waste = await WasteRepository.getWasteById(id);
        if (!waste) {
            return {
                message: `Waste with id ${id} not found`,
                data: null,
            };
        }
        return {
            message: `Fetching waste with id ${id} successful`,
            data: waste,
        };
    }

    static async scanWaste(image, user_id) {
        const image_buffer = image[0];
        const uploaded_image = await uploadImage(image_buffer);
        const predictResult = await MLService.predictWaste(uploaded_image);
        const trash_type = predictResult.result.toLowerCase();
        let image_result;
        if (trash_type === 'uncertain') {
            image_result =
                'https://firebasestorage.googleapis.com/v0/b/recraftify-service.appspot.com/o/image%2Fwaste%2Ftong%2Funcertain.png?alt=media&token=91673a6d-c687-4130-ac9e-8c25819dd4cf';
        }
        if (trash_type === 'residue') {
            image_result =
                'https://firebasestorage.googleapis.com/v0/b/recraftify-service.appspot.com/o/image%2Fwaste%2Ftong%2Fresidu.png?alt=media&token=56c3c896-e395-4ed3-a836-323be6ec1f03';
        }
        if (trash_type === 'b3') {
            image_result =
                'https://firebasestorage.googleapis.com/v0/b/recraftify-service.appspot.com/o/image%2Fwaste%2Ftong%2Fb3.png?alt=media&token=9daafc7f-5047-47c3-bc24-d585ef1bcb05';
        }
        if (trash_type === 'organic') {
            image_result =
                'https://firebasestorage.googleapis.com/v0/b/recraftify-service.appspot.com/o/image%2Fwaste%2Ftong%2Forganik.png?alt=media&token=fe4746a0-cdae-4aec-b4cd-3c960497eab8';
        }

        if (trash_type === 'recyclable') {
            image_result =
                'https://firebasestorage.googleapis.com/v0/b/recraftify-service.appspot.com/o/image%2Fwaste%2Ftong%2Fanorganik.png?alt=media&token=cfac5b9f-1442-496d-9347-f3bd31fb23f0';
        }

        let data = {
            uploaded_image,
            trash_type,
            image_result,
        };

        if (trash_type === 'recyclable' || trash_type === 'organic') {
            const recommendation =
                await WasteRepository.getWasteByType(trash_type);
            data = {
                uploaded_image,
                trash_type,
                recommendation,
                image_result,
            };

            await WasteRepository.createWasteScanHistory(data, user_id);
            return {
                message: 'Scanning waste successful',
                data: {
                    uploaded_image,
                    trash_type,
                    recommendation,
                    image_result,
                },
            };
        }

        await WasteRepository.createWasteScanHistory(data, user_id);
        return {
            message: 'Scanning waste successful',
            data: data,
        };
    }

    static async getWasteScanHistory(userId) {
        const wasteScanHistory =
            await WasteRepository.getAllWasteScanHistory(userId);
        if (!wasteScanHistory) {
            return {
                message: `Waste scan history with user id ${userId} not found`,
                data: null,
            };
        }
        return {
            message: 'Fetching waste scan history successful',
            data: wasteScanHistory,
        };
    }

    static async getWasteScanHistoryById(id) {
        const wasteScanHistory =
            await WasteRepository.getWasteScanHistoryById(id);
        if (!wasteScanHistory) {
            return {
                message: `Waste scan history with id ${id} not found`,
                data: null,
            };
        }
        return {
            message: `Fetching waste scan history with id ${id} successful`,
            data: wasteScanHistory,
        };
    }
}

module.exports = WasteService;
