'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sancard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sancard.init({
    ClientId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    number: DataTypes.STRING,
    sex: DataTypes.BOOLEAN,
    procedures: DataTypes.STRING,
    diagnosis: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'sancard',
    modelName: 'Sancard',
  });
  return Sancard;
};