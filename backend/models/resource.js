'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User,
      Tag,
      Organization,
      Category,
      Category_Resource,
      Org_Resource,
      Tag_Resource,
      User_Resource
    }) {
      this.belongsToMany(User, {
        through: "User_Resource",
        as: "users",
        foreignKey: "resource_id",
      });
      this.belongsToMany(Tag, {
        through: "Tag_Resource",
        foreignKey: "resource_id",
        otherKey: "tag_id",
        as: "tags",
      });
      this.belongsToMany(Category, {
        through: "Category_Resource",
        foreignKey: "resource_id",
        otherKey: "category_id",
        as: "categories",
      });
      this.belongsToMany(Organization, {
        through: "Org_Resource",
        as: "orgs",
        foreignKey: "resource_id",
      });
    }
  }
  Resource.init({
    resource_id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Event must have a name!" },
        notEmpty: { msg: "Name must not be empty!" },
      },
    },
    description: {
      type: DataTypes.STRING(5000),
    },
    location: DataTypes.STRING,
    link: DataTypes.STRING,
    photo:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    provider: DataTypes.STRING,
    is_platform_wide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};