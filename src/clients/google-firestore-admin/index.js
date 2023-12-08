var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');

const { SERVICE_KEY } = process.env;

function getDB() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(SERVICE_KEY),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
