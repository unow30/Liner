'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class highlights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      highlights.belongsTo(models.page, {
        foreignKey: 'pageId',
        onDelete: 'CASCADE',
      })
      highlights.belongsTo(models.color, {
        foreignKey: 'colorId',
        onDelete: 'CASCADE',
      })
    }
  };
  highlights.init({

  }, {
    sequelize,
    modelName: 'highlights',
  });
  return highlights;
};