const { ML_API_URL } = process.env;
const axios = require('axios');

class MLService {
    static async predictWaste(imageUrl) {
        const response = await axios.post(`${ML_API_URL}/predict`, {
            imageUrl,
        });
        return response.data;
    }
}

module.exports = MLService;
