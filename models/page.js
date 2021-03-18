'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Page.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      })

      Page.belongsToMany(models.Color, {
        through: 'Highlight',
        foreignKey: 'colorId',
        onDelete: 'cascade'
      })
    }
  };
  Page.init({
    userId: DataTypes.INTEGER,
    pageUrl: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Page',
  });
  return Page;
};