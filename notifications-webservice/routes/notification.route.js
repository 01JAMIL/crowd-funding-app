const express = require('express')
const { getReceiverNotifications, markAsViewed, saveNotification } = require('../controllers/notification.controller')

const router = express.Router()


router.get('/get/:id', getReceiverNotifications)
router.post('/save', saveNotification)
router.put('/seen/:id', markAsViewed)

module.exports = router