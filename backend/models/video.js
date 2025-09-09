'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Organization,Tag}) {
      this.belongsTo(Organization, {
        foreignKey: {
          type: DataTypes.UUID, 
          defaultValue: null,
          name: "org_id",
        },
        as: "organization",
      });
      this.belongsToMany(Tag, {
        through: "Video_Tag",
        foreignKey: "video_id",
        otherKey: "tag_id",
        as: "tags",
      });
    }
  }
  Video.init({
    org_id: {
      type: DataTypes.UUID,
      defaultValue: null,
    },
    video_id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING(3000),
      defaultValue: "",
    },
    link: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    image_url:{
      type: DataTypes.STRING,
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};