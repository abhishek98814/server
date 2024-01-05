// trekModel.js
const mongoose = require('mongoose');

const TrekSchema = new mongoose.Schema({
    trekVideoLink: String,
    mapImage: String,
    mainImage: String,
    galleryImages: [String],
});

const Trek = mongoose.model('TrekGallery', TrekSchema);

module.exports = Trek;
