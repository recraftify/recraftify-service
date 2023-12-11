const Cloud = require('@google-cloud/storage');
const StandardError = require('../../utils/standard-error');
const { GCP_PROJECT_NAME, GCP_BUCKET_NAME } = process.env;
const { SERVICE_KEY } = process.env;
const { Storage } = Cloud;

async function getBucket() {
    let bucket;
    const serviceAccount =
        typeof SERVICE_KEY === 'string' ? JSON.parse(SERVICE_KEY) : SERVICE_KEY;
    try {
        const storage = new Storage({
            keyFilename: serviceAccount,
            projectId: GCP_PROJECT_NAME,
        });

        bucket = storage.bucket(GCP_BUCKET_NAME);
    } catch (err) {
        throw new StandardError(
            500,
            'CLOUD_ERROR',
            'Something is wrong with the cloud storage',
            err,
        );
    }

    return bucket;
}

module.exports = {
    getBucket,
};
