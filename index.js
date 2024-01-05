require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const registerRouter = require('./routes/auth/authentication')
const trekTripRouter = require('./routes/trekTriproutes/trekTrip')

const PORT = process.env.PORT;
const cookieParser = require('cookie-parser')


main().catch(err => console.log(err))
async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database is connected')
}

app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json())


app.use('/', registerRouter)
app.use('/', trekTripRouter)





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})