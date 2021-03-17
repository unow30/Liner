'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      page.belongsToMany(models.color, {
        onDelete: 'CASCADE',
        through: 'highlights',
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  page.init({
    pageUrl: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'page',
  });
  return page;
};