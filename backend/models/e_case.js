'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class E_Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  E_Case.init({
    event_id: DataTypes.UUID,
    case_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'E_Case',
  });
  return E_Case;
};