'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      theme.hasMany(models.user, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })

      theme.hasMany(models.color, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  theme.init({
    themeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'theme',
  });
  return theme;
};