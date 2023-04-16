const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully!')
    })
    .catch(err => console.log('Database connection error', err))