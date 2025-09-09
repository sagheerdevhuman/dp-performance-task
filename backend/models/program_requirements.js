'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_Requirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program_Requirements.init({
    program_id: DataTypes.UUID,
    requirements_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Program_Requirements',
  });
  return Program_Requirements;
};