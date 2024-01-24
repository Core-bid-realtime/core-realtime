const { User, Product, Bid, OrderBid } = require("../models");

class MainController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  }
}


module.exports = MainController
