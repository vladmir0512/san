'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type_service.init({
    name: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'type_services',
    modelName: 'Type_service',
  });
  return Type_service;
};