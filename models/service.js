'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    ClientId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    TypeServiceId: DataTypes.INTEGER,
    number_services: DataTypes.INTEGER,
    date: DataTypes.DATE,
    full_cost: DataTypes.FLOAT,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'services',
    modelName: 'Service',
  });
  return Service;
};