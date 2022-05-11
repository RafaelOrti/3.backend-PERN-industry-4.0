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
    }
  }
  InstallationGraph.init({
    temperature: DataTypes.FLOAT,
    H2O: DataTypes.INTEGER,
    co2: DataTypes.INTEGER,
    c2h4: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'InstallationGraph',
  });
  return InstallationGraph;
};