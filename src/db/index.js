require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
} = process.env;
const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        dialect: 'postgres',
        define: {
            freezeTableName: true,
        },
        logging: false,
    },
);

const UserModel = require('./models/user-model');
const { WasteModel, LoggingScanModel } = require('./models/waste-model');

const models = {
    User: UserModel(sequelize, Sequelize),
    Waste: WasteModel(sequelize, Sequelize),
    LoggingScan: LoggingScanModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = { sequelize, models };
