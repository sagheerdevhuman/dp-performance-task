'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Org_Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Org_Resource.init({
    org_id: DataTypes.UUID,
    resource_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Org_Resource',
  });
  return Org_Resource;
};