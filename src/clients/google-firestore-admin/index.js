var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');

function getDB() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
