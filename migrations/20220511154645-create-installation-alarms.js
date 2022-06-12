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
      // installationId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Installations',
      //     key: 'id'
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   defaultValue: 0
      // },
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
      hC2H4Alarm: {
        type: Sequelize.BOOLEAN
      },
      lC2H4Alarm: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InstallationAlarms');
  }
};