'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bid.belongsTo(models.User, { foreignKey: 'UserId' });
      Bid.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  }
  Bid.init({
    bidAmount: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};