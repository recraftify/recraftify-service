var admin = require('firebase-admin');
var { getFirestore } = require('firebase-admin/firestore');
var serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const DB = getFirestore();

module.exports = DB;
