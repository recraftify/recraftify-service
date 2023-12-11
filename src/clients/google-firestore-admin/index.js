var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');

const { SERVICE_KEY } = process.secrets;

function getDB() {
    if (!admin.apps.length) {
        const serviceAccount =
            typeof SERVICE_KEY === 'string'
                ? JSON.parse(SERVICE_KEY)
                : SERVICE_KEY;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
