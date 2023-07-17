const express = require('express')
const app = express()
const port = 3036
process.env.TZ = "Asia/Seoul"

const cors = require('cors')

// const passportConfig = require('./passport');

// passportConfig(app);
// const userRouter = require('./routes/user');

// app.use('/auth', [userRouter]);
///

<a href="/users/kakao/start"></a>

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()
const indexRouter = require("./routes/index")
app.use(indexRouter)


const { sequelize } = require('./models/index')


////////////////////////////////////////////////////////////////////////////


sequelize
    .sync()
    .then(() => console.log('connected database'))
    .catch(err => console.error('occurred error in database connecting', err))

app.listen(port, () => {
    console.log("listening on port " + port)
})