'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'UserId' });
      Product.hasMany(models.Bid, { foreignKey: 'ProductId' });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name product is required",
        },
        notNull: {
          msg: "Name product  is required",
        }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required",
        },
        notNull: {
          msg: "Description  is required",
        }
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image URL is required",
        },
        notNull: {
          msg: "Image URL  is required",
        }
      },
    },
    currentBid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sold: DataTypes.BOOLEAN,
    timeLimit: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Time limit is required",
        },
        notNull: {
          msg: "Time limit is required",
        }
      },
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};