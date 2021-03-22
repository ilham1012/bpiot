'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Telemetries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      device: {
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.INTEGER
      },
      string_val: {
        type: Sequelize.STRING
      },
      long_val: {
        type: Sequelize.BIGINT
      },
      double_val: {
        type: Sequelize.DOUBLE
      },
      json_val: {
        type: Sequelize.JSON
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Telemetries');
  }
};