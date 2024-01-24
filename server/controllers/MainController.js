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
      next(error);
    }
  }

  static async chooseTheWinnerBid(req, res, next) {
    try {
      let data = await Product.findByPk(req.params.productId);
      if (!data) {
        throw { name: "productNotFound" };
      }
      if (data.sold === true) {
        throw { name: "productSold" };
      }
      data = await data.update({
        sold: true,
      });
      const findTheWinner = await Bid.findOne({
        attributes: ["bidAmount", "UserId", "ProductId"],
        where: sequelize.literal(`"bidAmount" = (SELECT MAX("bidAmount") FROM "Bids" WHERE "ProductId" = ${req.params.productId}) AND "ProductId" = ${req.params.productId}`),
      });
      let createOrderBid = await OrderBid.create({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
        amount: data.currentBid,
        UserId: findTheWinner.UserId,
      });
      res.status(201).json(createOrderBid);
    } catch (error) {
      next(error);
    }
  }

  static async sendBid(req, res, next) {
    try {
      if (req.body.bidAmount === "") {
        throw { name: "inputYourAmount" };
      }
      let newBid = await Bid.create({
        UserId: req.user.id,
        ProductId: req.body.ProductId,
        bidAmount: req.body.bidAmount,
      });
      return res.status(201).json(newBid);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBid(req, res, next) {
    try {
      const productId = req.params.productId;

      const product = await Product.findByPk(productId);

      if (!product) {
        throw { name: "productNotFound" };
      }

      const bids = await Bid.findAll({
        where: { ProductId: productId },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
        order: [["id", "ASC"]],
      });
      return res.status(200).json(bids);
    } catch (error) {
      next(error);
    }
  }
  static async getTimeLimitProduct(req, res, next) {
    try {
      const products = await Product.findOne({
        where: {
          id: req.params.productId,
        },
        attributes: ["id", "timeLimit"],
      });
      if (!products) {
        throw { name: "productNotFound" };
      }
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MainController;
