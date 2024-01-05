const { TrekOverview } = require('../../model/trip/trektrip');

exports.createTrek = async (req, res) => {
    try {
        const { tripTitle, tripDesc, tripOverView, Itinerary, trekFaq, priceIncludes, priceExcludes, tripHighlight, tripDays, tripPrice, condition } = req.body;
        const newHeading = new TrekOverview({ tripTitle, tripDesc, tripOverView, Itinerary, trekFaq, priceIncludes, priceExcludes, tripHighlight, tripDays, tripPrice, condition });
        const savedHeading = await newHeading.save();
        res.json(savedHeading);
        console.log(savedHeading);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.replaceTrek = async (req, res) => {
    const id = req.params.id;
    try {
        const tripDoc = await TrekOverview.findOneAndReplace({ _id: id }, req.body, { new: true })
        res.status(202).json(tripDoc)
    } catch (err) {
        console.log(err)
    }
}
exports.updateTrek = async (req, res) => {
    const id = req.params.id;
    try {
        const trekOverview = await TrekOverview.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(202).json(trekOverview)
    } catch (err) {
        console.log(err)
        res.status(202).json(err)
    }
};
exports.getAllTrek = async (req, res) => {
    const trekOverview = await TrekOverview.find()
    res.json(trekOverview)
};

exports.getTrek = async (req, res) => {
    const id = req.params.id;
    const docTrekOverview = await TrekOverview.findById((id))
    res.json(docTrekOverview)
}

exports.deleteTrek = async (req, res) => {
    const id = req.params.id;
    try {
        const docTrekOverview = await TrekOverview.findByIdAndDelete({ _id: id });
        res.status(202).json(docTrekOverview)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

