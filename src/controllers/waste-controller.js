const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const wasteRouter = require('express').Router();
const WasteService = require('../services/waste-service');
const JWTMiddleware = require('../middlewares/jwt');
const { uploadFile } = require('../middlewares/file');

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
    wasteRouter.post(
        '/scan',
        [JWTMiddleware.verifyToken, uploadFile],
        handleRequest(
            async (req) => await WasteService.scanWaste(req.body.image),
        ),
        buildResponse(),
    );
    return wasteRouter;
};
