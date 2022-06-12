'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstallationGraph extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Installation, {
      //   foreignKey: 'installationId'
      // });
    }
  }
  InstallationGraph.init({
    // installationId: DataTypes.INTEGER,
    onOff: DataTypes.BOOLEAN,
    mode: DataTypes.BOOLEAN,
    door: DataTypes.BOOLEAN,
    temperature: DataTypes.FLOAT,
    H2O: DataTypes.INTEGER,
    CO2: DataTypes.INTEGER,
    C2H4: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'InstallationGraph',
  });
  return InstallationGraph;
};