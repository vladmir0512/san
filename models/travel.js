'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Travel.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    services: DataTypes.STRING,
    cost: DataTypes.FLOAT
  }, {
    sequelize,
    tableName: 'travel',
    modelName: 'Travel',
  });
  return Travel;
};