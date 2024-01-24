/** @format */

const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const PaymentController = require("../controllers/PaymentController");
const MainController = require("../controllers/MainController");

const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");

router.get("/", (req, res) => {
	res.status(200).json({ message: "Server is Running..." });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);
// 1. home (tampilin semua product yang sold false)
router.get("/products", MainController.getAllProducts);
// 2. tambah product
router.post("/products", MainController.postProduct);
// 3. delete product
router.delete("/products/:productId", MainController.deleteProduct);
// 4. ambil semua bid dari suatu product (ambil pesan)
router.get("/product/:productId", MainController.getProductById);
// 5. ambil semua list product by user id
router.get("/list", MainController.listByUserId);

// 6. pilih pemenang lelang
router.post("/products/:productId", MainController.chooseTheWinnerBid);
// 7. kirim bid
router.post("/bid", MainController.sendBid);
// 8. ambil semua bid dari suatu product (ambil pesan)
router.get("/bid/:productId", MainController.getAllBid);

// 9. ambil semua product yang dimenangin oleh user
router.get("/user/products", MainController.productsWinBid);
// 10. ambil semua product yang dimenangin oleh user
router.get("/user/me", UserController.userById);
// 11. ambil semua product yang dimenangin oleh user
router.get("/product/timelimit/:productId", MainController.getTimeLimitProduct);

// 12. untuk initiate order products ke midtrans
router.post(
	"/payment/midtrans/token/:orderBidId",
	PaymentController.getMidtransToken
);
// 13. untuk mengubah status setelah pembayaran midtrans
router.post(
	"/payment/midtrans/notification",
	PaymentController.getMidtransNotification
);

router.use(errorHandlers);

module.exports = router;
