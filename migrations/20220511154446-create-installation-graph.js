'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('InstallationGraphs', {
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
      onOff: {
        type: Sequelize.BOOLEAN
      },
      mode: {
        type: Sequelize.BOOLEAN
      },
      door: {
        type: Sequelize.BOOLEAN
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      H2O: {
        type: Sequelize.INTEGER
      },
      CO2: {
        type: Sequelize.INTEGER
      },
      C2H4: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('InstallationGraphs')
  }
}
