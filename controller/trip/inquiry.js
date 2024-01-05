
const { InquiryModel } = require('../../model/auth/inquiry')

exports.createInquiry = async (req, res) => {
    try {
        const { userName, userEmail, userNumber } = req.body;
        const newUser = new InquiryModel({ userName, userEmail, userNumber });
        const saveUser = await newUser.save();
        res.json(saveUser)
        console.log(saveUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAll = async (req, res) => {
    const inquiryUser = await InquiryModel()
    res.json(inquiryUser)
}

exports.getUserByID = async (req, res) => {
    const id = req.params.id;
    const singleUser = await InquiryModel((id))
    res.json(singleUser)
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const inquiryUser = await InquiryModel.findByIdAndDelete({ _id: id });
        res.status(202).json(inquiryUser)
    } catch (err) {
        console.log(err)
    }
}