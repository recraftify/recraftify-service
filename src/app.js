const express = require('express');
const cors = require('./middlewares/cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./db/index');
const userController = require('./controllers/user-controller');

async function setupRoutes(app) {
    app.use('/', userController());
}

(async () => {
    try {
        const app = express();
        app.use(express.json());
        app.use(cors);
        app.use(bodyParser.urlencoded({ extended: true }));
        sequelize.sync();
        await setupRoutes(app);
        app.listen(process.env.PORT, () => {
            console.log(
                `Example app listening at http://localhost:${process.env.PORT}`,
            );
        });
    } catch (error) {
        console.log(error);
    }
})();
