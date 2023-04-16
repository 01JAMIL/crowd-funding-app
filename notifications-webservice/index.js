const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const notificationRouter = require('./routes/notification.route')
require('dotenv').config()
require('./config/db.config')


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/notification', notificationRouter)

app.listen(process.env.PORT, () => {
    console.log(`Service running on port ${process.env.PORT}`)
})