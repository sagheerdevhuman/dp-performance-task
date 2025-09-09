'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile_Tag.init({
    profile_id: DataTypes.UUID,
    tag_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Profile_Tag',
  });
  return Profile_Tag;
};