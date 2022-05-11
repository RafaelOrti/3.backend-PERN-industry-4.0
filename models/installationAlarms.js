'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstallationAlarms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstallationAlarms.init({
    hTempAlarm: DataTypes.BOOLEAN,
    lTempAlarm: DataTypes.BOOLEAN,
    hH2OAlarm: DataTypes.BOOLEAN,
    lH2OAlarm: DataTypes.BOOLEAN,
    hC2OAlarm: DataTypes.BOOLEAN,
    lC2OAlarm: DataTypes.BOOLEAN,
    hC2H4Alarm: DataTypes.BOOLEAN,
    lC2H4Alarm: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'InstallationAlarms',
  });
  return InstallationAlarms;
};