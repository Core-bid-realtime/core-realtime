const express = require("express");
const router = express.Router();

const errorHandlers = require("../middlewares/errorHandlers");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const MainController = require("../controllers/MainController");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running..." });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/products", MainController.getAllProducts);
router.get
router.use(errorHandlers);

module.exports = router;
