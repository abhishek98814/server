// trekController.js
const mongoose = require('mongoose');
const Trek = require('../../model/trip/trekAllimage');

exports.submitAllData = async (req, res) => {
    try {
        const { trekVideoLink } = req.body;
        const uploadedMapImage = req.files.mapImage[0];
        const uploadedMainImage = req.files.mainImage[0];
        const uploadedGalleryImages = req.files.galleryImages;

        const newTrek = new Trek({
            trekVideoLink,
            mapImage: uploadedMapImage.filename,
            mainImage: uploadedMainImage.filename,
            galleryImages: uploadedGalleryImages.map(image => image.filename),
        });

        await newTrek.save();

        res.json({ message: 'Trek data saved successfully', filenames: [...uploadedGalleryImages.map(image => image.filename), uploadedMapImage.filename, uploadedMainImage.filename] });
    } catch (err) {
        console.error('Error in submitAllData:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
