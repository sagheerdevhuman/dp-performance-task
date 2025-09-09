'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class P_Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  P_Case.init({
    program_id: DataTypes.UUID,
    case_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'P_Case',
  });
  return P_Case;
};