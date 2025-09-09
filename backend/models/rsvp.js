'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RSVP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RSVP.init({
    event_id: DataTypes.UUID,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    tableName:'rsvps',
    modelName: 'RSVP',
  });
  return RSVP;
};