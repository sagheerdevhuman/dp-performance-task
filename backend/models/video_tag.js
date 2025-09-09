'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video_Tag.init({
    video_id: DataTypes.UUID,
    tag_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Video_Tag',
  });
  return Video_Tag;
};