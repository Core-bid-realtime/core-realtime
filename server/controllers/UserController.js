const { User, Bid, OrderBid, Product } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
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

  static async login(req, res, next) {
    try {
        let { email, password } = req.body
        if (!email) {
            throw { name: 'emailRequired' }
        }
        if (!password) {
            throw { name: 'passwordRequired' }
        }
        let findUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (!findUser) {
            throw { name: 'invalidUser' }
        }
        let verifyPassword = comparePassword(password, findUser.password)
        if (!verifyPassword) {
            throw { name: 'invalidUser' }
        }
        let access_token = signToken(findUser)
        res.status(200).json({ access_token })
    } catch (error) {
        next(error)
    }
}
}

module.exports = UserController;
