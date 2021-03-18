'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.page, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId'
      })



    }
  };
  user.init({
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    isPremium: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};