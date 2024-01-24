const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function extractToken(token){
    let verify = verifyToken(token)
    let findUser = await User.findByPk(verify.id)
    return findUser
}

module.exports = extractToken