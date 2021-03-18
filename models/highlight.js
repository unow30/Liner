'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Highlight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Highlight.init({
    colorId: DataTypes.INTEGER,
    pageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Highlight',
  });
  return Highlight;
};