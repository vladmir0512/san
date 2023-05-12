'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'ClientId',
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      RoomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'RoomId',
        references: {
          model: 'rooms',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      number_adult: {
        type: Sequelize.INTEGER
      },
      number_children: {
        type: Sequelize.INTEGER
      },
      TravelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'TravelId',
        references: {
          model: 'travel',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      date_arrival: {
        type: Sequelize.DATE
      },
      date_departure: {
        type: Sequelize.DATE
      },
      full_cost: {
        type: Sequelize.FLOAT
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservations');
  }
};