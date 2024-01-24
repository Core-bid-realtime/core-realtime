const { User, Product, Bid, OrderBid, sequelize } = require("../models");

class MainController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async postProduct(req, res, next) {
    try {
      const { name, description, imageUrl, currentBid, timeLimit } = req.body;
      const data = await Product.create({
        name,
        description,
        imageUrl,
        currentBid,
        timeLimit,
        UserId: req.user.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;

      if (!productId) {
        throw { name: "invalidProductId" };
      }

      const data = await Product.findByPk(productId);

      if (!data) {
        throw { name: "productNotFound" };
      }
      await data.destroy();
      res.status(200).json({ message: `Successfully Deleted Product` });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw { name: "invalidProductId" };
      }
      const data = await Product.findOne({
        where: {
          id: productId,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      if (!data) {
        throw { name: "productNotFound" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async listByUserId(req, res, next) {
    try {

      const products = await Product.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MainController;
