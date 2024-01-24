const { User, Bid, OrderBid, Product } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const createdUser = await User.create({ fullname, email, password });
      console.log(createdUser);
      res.status(201).json({
        id: createdUser.id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
