var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = 'gs://recraftify-service.appspot.com/keys.json';

function getDB() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    return getFirestore();
}

module.exports = { getDB };
