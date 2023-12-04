const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const wasteRouter = require('express').Router();
const WasteService = require('../services/waste-service');
const JWTMiddleware = require('../middlewares/jwt');

module.exports = () => {
    wasteRouter.get(
        '/',
        [JWTMiddleware.verifyToken],
        handleRequest(async () => await WasteService.getWaste()),
        buildResponse(),
    );
    wasteRouter.get(
        '/:id',
        [JWTMiddleware.verifyToken],
        handleRequest(
            async (req) => await WasteService.getWasteById(req.params.id),
        ),
        buildResponse(),
    );
    return wasteRouter;
};
