'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class O_Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  O_Case.init({
    org_id: DataTypes.UUID,
    case_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'O_Case',
  });
  return O_Case;
};