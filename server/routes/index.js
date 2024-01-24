const express = require('express')
const router = express.Router()

const errorHandlers = require('../middlewares/errorHandlers')
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.status(200).json({ message: "Server is Running..."})
})


router.use(authentication)

router.use(errorHandlers)

module.exports = router