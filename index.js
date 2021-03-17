const express = require('express')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const { corsConfig } = require('./options')
const morgan = require('morgan')

const { myhighlightsRouter, highlightRouter, settingsRouter, userRouter } = require('./routes')

const app = express();
const port = 4000

app.use(cookieParser())
app.use(helmet())
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/new', (req, res) => {
    res.json("데이터 표시?")
})
app.use('/user', userRouter)
app.use('/myhighlights', myhighlightsRouter)
app.use('/highlight', highlightRouter)
app.use('/settings', settingsRouter)

app.listen(port, () => {
    console.log(`connect server localhost:${port}`)
})