'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('travel', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.FLOAT
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('travel');
  }
};