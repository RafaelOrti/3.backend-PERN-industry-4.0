'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Installation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Action, {
      //   foreignKey: 'installationId'
      // });
      // this.hasMany(models.InstallationAlarms, {
      //   foreignKey: 'installationId'
      // });
      // this.hasMany(models.InstallationGraph, {
      //   foreignKey: 'installationId'
      // });
      // this.hasMany(models.RealTimeInstallation, {
      //   foreignKey: 'installationId'
      // });
    }
  }
  Installation.init({
    installationId: DataTypes.STRING,
    installationType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Installation',
  });
  return Installation;
};