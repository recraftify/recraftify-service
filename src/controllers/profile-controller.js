const profileRouter = require('express').Router();
const JWTMiddleware = require('../middlewares/jwt');
const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const UserService = require('../services/user-service');

module.exports = () => {
    profileRouter.get(
        '/',
        [JWTMiddleware.verifyToken],
        handleRequest(async (req) => await UserService.getUser(req.user.id)),
        buildResponse(),
    );
    return profileRouter;
};
