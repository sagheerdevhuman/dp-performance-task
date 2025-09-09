'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event_Requirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event_Requirements.init({
    event_id: DataTypes.UUID,
    requirements_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Event_Requirements',
  });
  return Event_Requirements;
};