"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Topic, Program, Image, Profile}) {
      this.hasMany(Topic, {
        as: "topics",
      });
      Topic.belongsTo(Skill);
      Skill.belongsToMany(Program, {
        through: "Topic",
        as: "programs",
        foreignKey: "skill_id",
      });
      Skill.belongsToMany(Profile, {
        through: "Profile_Skill",
        as: "profiles",
        foreignKey: "skill_id",
      });
      this.hasOne(Image, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "skill_id",
        },
        as: "images",
      });
    }
  }
  Skill.init(
    {
      skill_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Skill must have a name!" },
          notEmpty: { msg: "Name must not be empty!" },
        },
      },
      icon_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      default: { type: DataTypes.STRING, field: 'default_value' },
    },
    {
      sequelize,
      tableName: "skills",
      modelName: "Skill",
    }
  );

  return Skill;
};
