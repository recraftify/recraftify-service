require('dotenv').config();
const express = require('express');
const cors = require('./middlewares/cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth-controller');
const profileController = require('./controllers/profile-controller');

async function setupRoutes(app) {
    app.use('/', authController());
    app.use('/profile', profileController());
}

(async () => {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors);
        app.use(bodyParser.urlencoded({ extended: true }));
        await setupRoutes(app);
        app.listen(process.env.PORT, () => {
            console.log(
                `recraftify-app listening at http://localhost:${process.env.PORT}`,
            );
        });
    } catch (error) {
        console.log(error);
    }
})();
