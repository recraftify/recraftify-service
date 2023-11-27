const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const UserService = require('../services/user-service');

const userRouter = require('express').Router();

module.exports = () => {
    userRouter.post(
        '/register',
        validator.body(
            Joi.object({
                name: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        ),
        handleRequest(async (req) => await UserService.createUser(req.body)),
        buildResponse(),
    );
    userRouter.post(
        '/login',
        validator.body(
            Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        ),
        handleRequest(async (req) => await UserService.login(req.body)),
        buildResponse(),
    );
    return userRouter;
};
