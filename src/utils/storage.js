const GCPStorageClient = require('../clients/google-cloud-storage');
const path = require('path');
const crypto = require('crypto');
const convert = require('heic-convert');

async function heicConvert(file) {
    file.buffer = await convert({
        buffer: file.buffer,
        format: 'JPEG',
        quality: 1,
    });

    file.mimetype = 'image/jpeg';
    file.originalname = 'recraftify.jpeg';
}

async function uploadImage(file) {
    if (file.mimetype === 'image/heic') {
        await heicConvert(file);
    }

    const fileName = `image/waste/scan/${
        crypto.randomBytes(20).toString('hex') +
        path.parse(file.originalname).ext
    }`;
    return await GCPStorageClient.uploadPromise(file, fileName);
}

module.exports = {
    uploadImage,
};
