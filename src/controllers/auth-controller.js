const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const AuthService = require('../services/auth-service');

const authRouter = require('express').Router();

module.exports = () => {
    authRouter.post(
        '/register',
        validator.body(
            Joi.object({
                name: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        ),
        handleRequest(async (req) => await AuthService.createUser(req.body)),
        buildResponse(),
    );
    authRouter.post(
        '/login',
        validator.body(
            Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        ),
        handleRequest(async (req) => await AuthService.login(req.body)),
        buildResponse(),
    );
    return authRouter;
};
