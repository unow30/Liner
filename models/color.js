'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      color.belongsToMany(models.page, {
        onDelete: 'CASCADE',
        through: 'highlights',
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  color.init({
    num: DataTypes.INTEGER,
    colorhex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'color',
  });
  return color;
};