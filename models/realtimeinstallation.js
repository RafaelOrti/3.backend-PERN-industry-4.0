'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RealTimeInstallation extends Model {
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
  RealTimeInstallation.init({
    // installationId: DataTypes.INTEGER,
    co2: DataTypes.INTEGER,
    h2o: DataTypes.INTEGER,
    temperature: DataTypes.FLOAT,
    c2h4: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'RealTimeInstallation',
  });
  return RealTimeInstallation;
};