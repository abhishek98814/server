const User = require('../../model/auth/authentication')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

exports.createRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const bcryptSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json(userDoc)
        console.log(userDoc)

    } catch (err) {
        res.status(500).json({ error: err.message || 'Interna Servere Error' })
    }
}

exports.createLogin = async (req, res) => {
    try {
        const jwtSecret = 'asdfghjklpoiuytreqw123';
        const { email, password } = req.body;
        const UserDoc = await User.findOne({ email });

        if (UserDoc) {
            const passOk = bcrypt.compareSync(password, UserDoc.password);
            if (passOk) {
                const token = jwt.sign({
                    email: UserDoc.email,
                    id: UserDoc._id,
                    name: UserDoc.name
                }, jwtSecret, {});
                res.cookie('token', token);
                res.json({
                    success: true,
                    user: {
                        email: UserDoc.email,
                        id: UserDoc._id,
                        name: UserDoc.name
                    }
                })
            } else {
                console.log('Incorrect Password')
                res.status(401).json({ success: false, message: 'Incorrect password' });

            }
        } else {
            res.status(404).json({ success: false, message: 'User not found' })
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getProfile = async (req, res) => {
    const jwtSecret = 'asdfghjklpoiuytreqw123';
    const { token } = req.cookies;

    try {
        if (token) {
            const UserData = await jwt.verify(token, jwtSecret, {});
            const { name, email, _id } = await User.findById(UserData.id);
            res.json({ name, email, _id });
            console.log('User profile retrieved successfully!');
        } else {
            console.log('No token found');
            res.json(null);
        }
    } catch (err) {
        // Handle errors, log, and send an appropriate response
        console.error('Error while retrieving user profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.createLogout = async (req, res) => {
    res.cookie('token', '').json(true);
    console.log("Hey I am logout")
}