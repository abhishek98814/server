const mongoose = require('mongoose');

const { Schema } = mongoose;

const InquirySchema = new Schema({
    userName: String,
    userEmail: String,
    userNumber: Number
})

const InquiryModel = mongoose.model('Inquiry', InquirySchema);

module.exports = InquiryModel;