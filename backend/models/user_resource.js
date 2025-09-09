'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Resource.init({
    user_id: DataTypes.UUID,
    resource_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User_Resource',
  });
  return User_Resource;
};