var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const serviceAccount = path.join(__dirname, '../config/keys.json');

function getDB() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
