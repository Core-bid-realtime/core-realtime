const bycrypt = require("bcryptjs");

module.exports = {
  hashPassword: (password) => bycrypt.hashSync(password, 5),
  comparePassword: (password, db_password) => bycrypt.compareSync(password, db_password),
};