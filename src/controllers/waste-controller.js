const handleRequest = require('../utils/handle-request');
const buildResponse = require('../utils/build-response');
const wasteRouter = require('express').Router();
const WasteService = require('../services/waste-service');
const JWTMiddleware = require('../middlewares/jwt');
const { uploadFile } = require('../middlewares/file');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

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
        validator.params(
            Joi.object({
                id: Joi.string().required(),
            }),
        ),
        handleRequest(
            async (req) => await WasteService.getWasteById(req.params.id),
        ),
        buildResponse(),
    );
    wasteRouter.post(
        '/scan',
        [JWTMiddleware.verifyToken, uploadFile],
        handleRequest(
            async (req) =>
                await WasteService.scanWaste(req.body.image, req.user.id),
        ),
        buildResponse(),
    );
    wasteRouter.get(
        '/scan/history',
        [JWTMiddleware.verifyToken],
        handleRequest(
            async (req) => await WasteService.getWasteScanHistory(req.user.id),
        ),
        buildResponse(),
    );
    wasteRouter.get(
        '/scan/history/:id',
        [JWTMiddleware.verifyToken],
        validator.params(
            Joi.object({
                id: Joi.string().required(),
            }),
        ),
        handleRequest(
            async (req) =>
                await WasteService.getWasteScanHistoryById(req.params.id),
        ),
        buildResponse(),
    );
    return wasteRouter;
};
