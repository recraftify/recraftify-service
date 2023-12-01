const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: 'AIzaSyBQA-2I1y-rKF29dQR7XfM0ap1IMApYh8g',
    authDomain: 'recraftify-service.firebaseapp.com',
    projectId: 'recraftify-service',
    storageBucket: 'recraftify-service.appspot.com',
    messagingSenderId: '201869056725',
    appId: '1:201869056725:web:5656efed06a852f770e05c',
    measurementId: 'G-3QGLH3M25M',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const DB = getFirestore(app);

module.exports = { DB, auth };
