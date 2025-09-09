'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tag_Event.init({
    event_id: DataTypes.UUID,
    tag_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Tag_Event',
  });
  return Tag_Event;
};