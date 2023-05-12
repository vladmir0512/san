'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    size: DataTypes.STRING  

    
  }, {
    sequelize,
    tableName: 'rooms',
    modelName: 'Room',
  });
  return Room;
};