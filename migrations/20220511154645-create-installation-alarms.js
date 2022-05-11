'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InstallationAlarms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hTempAlarm: {
        type: Sequelize.BOOLEAN
      },
      lTempAlarm: {
        type: Sequelize.BOOLEAN
      },
      hH2OAlarm: {
        type: Sequelize.BOOLEAN
      },
      lH2OAlarm: {
        type: Sequelize.BOOLEAN
      },
      hC2OAlarm: {
        type: Sequelize.BOOLEAN
      },
      lC2OAlarm: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InstallationAlarms');
  }
};