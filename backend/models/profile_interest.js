'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile_Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile_Interest.init({
    profile_id: DataTypes.UUID,
    interest_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profile_Interest',
  });
  return Profile_Interest;
};