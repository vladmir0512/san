'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
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
        defaultValue: 1,
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      TypeServiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'TypeServiceId',
        defaultValue: 1,
        references: {
          model: 'type_services',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      number_services: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      full_cost: {
        type: Sequelize.FLOAT
      },
      isPaid :{
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};