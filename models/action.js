'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Installation, {
        foreignKey: 'installationId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Action.init({
    userId: DataTypes.INTEGER,
    installationId: DataTypes.INTEGER,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};