const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const PaymentController = require('../controllers/PaymentController')
const MainController = require('../controllers/MainController')

const errorHandlers = require('../middlewares/errorHandlers')
const authentication = require('../middlewares/authentication')


router.get('/', (req, res) => {
    res.status(200).json({ message: "Server is Running..."})
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', MainController.getAllProducts)  // home (tampilin semua product yang sold false)
router.post('/products', MainController.postProduct)    // tambah product
router.delete('/products/:productId', MainController.deleteProduct) // delete product
router.get('/product/:productId', MainController.getProductById) // ambil semua bid dari suatu product (ambil pesan)
router.get('/list', MainController.listByUserId) // ambil semua list product by user id

router.post('/products/:productId', MainController.chooseTheWinnerBid) // pilih pemenang lelang
router.post('/bid', MainController.sendBid) // kirim bid
router.get('/bid/:productId', MainController.getAllBid) // ambil semua bid dari suatu product (ambil pesan)

router.get('/user/products', MainController.productsWinBid) // ambil semua product yang dimenangin oleh user
router.get('/user/me', UserController.userById) // ambil semua product yang dimenangin oleh user
router.get('/product/timelimit/:productId', MainController.getTimeLimitProduct) // ambil semua product yang dimenangin oleh user

router.post('/payment/midtrans/token/:orderBidId', PaymentController.getMidtransToken)
router.post('/payment/midtrans/notification', PaymentController.getMidtransNotification)

router.use(errorHandlers)


module.exports = router