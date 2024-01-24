const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        let { authorization } = req.headers
        if (!authorization) {
            throw { name: "invalidToken" }
        }
        let split = authorization.split(' ')
        if (split.length < 2) {
            throw { name: "invalidToken" }
        }
        if (split[0] !== 'Bearer') {
            throw { name: "invalidToken" }
        }
        let checkToken = verifyToken(split[1])
        if (checkToken === 'invalidToken') {
            throw { name: "invalidToken" }
        }
        let findUser = await User.findByPk(checkToken.id)
        if (!findUser) {
            throw { name: "invalidToken" }
        }
        req.user = findUser
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication