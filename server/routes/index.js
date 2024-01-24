const express = require('express')
const router = express.Router()

const errorHandlers = require('../middlewares/errorHandlers')
const authentication = require('../middlewares/authentication')

const MainController = require('../controllers/MainController')

router.get('/', (req, res) => {
    res.status(200).json({ message: "Server is Running..."})
})

router.get('/products', MainController.getAllProducts)

router.use(authentication)

router.use(errorHandlers)

module.exports = router