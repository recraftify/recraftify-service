require('dotenv').config();
const express = require('express');
const cors = require('./middlewares/cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authController = require('./controllers/auth-controller');
const profileController = require('./controllers/profile-controller');
const wasteController = require('./controllers/waste-controller');
const { PORT } = process.env;

async function setupRoutes(app) {
    app.use('/', authController());
    app.use('/profile', profileController());
    app.use('/waste', wasteController());
}

(async () => {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors);
        app.use(morgan('combined'));
        app.use(bodyParser.urlencoded({ extended: true }));
        await setupRoutes(app);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`recraftify-app listening at Port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
