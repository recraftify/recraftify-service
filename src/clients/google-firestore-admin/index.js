var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');

function getDB() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(process.env.FIREBASE_SERVICE_KEY),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
