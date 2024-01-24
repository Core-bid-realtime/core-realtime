const express = require("express");
const router = express.Router();

const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const MainController = require("../controllers/MainController");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Your Server Was Running Now..." });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/products", MainController.getAllProducts);
router.post('/products', MainController.postProduct)    // tambah product
router.delete('/products/:productId', MainController.deleteProduct) // delete product
router.get('/products/:productId', MainController.getProductById)
router.get('/list', MainController.listByUserId) 
router.post('/products/:productId', MainController.chooseTheWinnerBid) // pilih pemenang lelang
router.post('/bid', MainController.sendBid)
router.post('/bid/:productId', MainController.getAllBid)

router.use(errorHandlers);

module.exports = router;
