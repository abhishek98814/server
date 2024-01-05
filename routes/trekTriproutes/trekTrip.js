const express = require('express');
const trekController = require('../../controller/trip/trekTrip')
const trekControllerImage = require('../../controller/trip/trekAllImage')
const multer = require('multer')
const trekRouter = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    },
});

const upload = multer({ storage: storage });

trekRouter.post('/trip', trekController.createTrek)
trekRouter.get('/trip', trekController.getAllTrek)
trekRouter.get('/trip/:id', trekController.getTrek)
trekRouter.put('/trip/:id', trekController.replaceTrek)
trekRouter.patch('/trip/:id', trekController.updateTrek)
trekRouter.delete('/trip/:id', trekController.deleteTrek)
trekRouter.post('/submitAllData', upload.fields([
    { name: 'mapImage', maxCount: 1 },
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 10 },
]), trekControllerImage.submitAllData);








module.exports = trekRouter