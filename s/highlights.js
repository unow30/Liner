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
      models.color.belongsToMany(models.page, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        through: 'highlights',
        foreignKey: {
          allowNull: false
        }
      })

      models.page.belongsToMany(models.color, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        through: 'highlights',
        foreignKey: {
          allowNull: false
        }
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