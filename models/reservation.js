'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init({
    ClientId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER,
    number_adult: DataTypes.INTEGER,
    number_children: DataTypes.INTEGER,
    TravelId: DataTypes.INTEGER,
    date_arrival: DataTypes.DATE,
    date_departure: DataTypes.DATE,
    full_cost: DataTypes.FLOAT,
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'reservations',
    modelName: 'Reservation',
  });
  return Reservation;
};