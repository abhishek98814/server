
const mongoose = require('mongoose')
const { Schema } = mongoose;

const TripOverView = new Schema({
    tripTitle: String,
    tripDesc: String,
    tripOverView: String,
    tripDays: String,
    tripPrice: Number,
    tripHighlight: [String],
    priceIncludes: [String],
    priceExcludes: [String],
    Itinerary: [
        {
            day: Number,
            question: String,
            answer: String
        }
    ],
    trekFaq: [
        {
            faqQuestion: String,
            faqAnswer: String,
        }
    ],
    condition: [{
        Country: String,
        City: String,
        Duration: String,
        Difficulty: String,
        Activity: String,
        MaxAltitude: mongoose.Schema.Types.Mixed,
        BestSeason: String,
        Accommodation: String,
        Meals: String,
        Points: String,
    }],
});


const TrekOverview = mongoose.model("TrekOverview", TripOverView)
module.exports = {
    TrekOverview,
}