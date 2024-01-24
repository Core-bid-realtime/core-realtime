/** @format */

const express = require("express");
const router = express.Router();

const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const MainController = require("../controllers/MainController");
const PaymentController = require( "../controllers/paymentController" )

  ;

router.get("/", (req, res) => {
	res.status(200).json({ message: "Hello Your Server Was Running Now..." });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/products", MainController.getAllProducts);
router.post("/products", MainController.postProduct);
router.delete("/products/:productId", MainController.deleteProduct);
router.get("/products/:productId", MainController.getProductById);
router.get("/list", MainController.listByUserId);
router.post("/products/:productId", MainController.chooseTheWinnerBid);
router.post("/bid", MainController.sendBid);
router.post("/bid/:productId", MainController.getAllBid);
router.get("/user/me", UserController.userById);
router.get( "/product/timelimit/:productId", MainController.getTimeLimitProduct );

router.use(errorHandlers);

module.exports = router;
