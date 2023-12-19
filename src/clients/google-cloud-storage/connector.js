const Cloud = require('@google-cloud/storage');
const StandardError = require('../../utils/standard-error');
const { GCP_PROJECT_NAME, GCP_BUCKET_NAME } = process.env;
const { Storage } = Cloud;

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

async function getBucket() {
    let bucket;

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
