const Notification = require('../models/notification.model')
const asyncHandler = require('express-async-handler')



const getReceiverNotifications = asyncHandler(async (req, res) => {
    const { id } = req.params

    const notifications = await Notification.find({ receiver: id })

    return res.status(200).json(notifications.reverse())
})

const saveNotification = asyncHandler(async (req, res) => {

    const created = await Notification.create(req.body)

    if (!created) {
        return res.status(400).json({
            result: 'Can\'t save notification'
        })
    }

    return res.status(201).json(created)
})

const markAsViewed = asyncHandler(async (req, res) => {

    const { id } = req.params

    const notification = await Notification.findOne({ _id: id })
    notification.seen = true


    const result = await Notification.findOneAndUpdate(
        {
            _id: id
        },
        notification
        , {
            new: true
        })

    if (!result) {
        return res.status(400).json({
            result: 'Something went wrong'
        })
    }

    return res.status(200).json(result)
})

module.exports = {
    getReceiverNotifications,
    saveNotification,
    markAsViewed
}