'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color.belongsTo(models.Theme, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'themeId',
          allowNull: false
        }
      })
      Color.hasMany(models.Highlight)
      // Color.belongsToMany(models.Page, {
      //   through: 'Highlight',
      //   foreignKey: 'pageId',
      //   onDelete: 'cascade'
      // })
    }
  };
  Color.init({
    themeId: DataTypes.INTEGER,
    num: DataTypes.INTEGER,
    colorHex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};