const mongoose = require('mongoose')


const NotificationSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true
    },

    receiver: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    donationId: {
        type: String,
        required: true
    },

    donationImage: {
        type: String,
        required: true
    },

    donationTitle: {
        type: String,
        required: true
    },

    seen: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchema)