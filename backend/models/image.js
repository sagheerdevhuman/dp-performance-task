"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Organization, Program, Event, Skill }) {
      this.belongsTo(Organization, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "org_id",
        },
        as: "organization",
      });
      this.belongsTo(Program, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "program_id",
        },
        as: "programs",
      });
      this.belongsTo(Event, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "event_id",
        },
        as: "events",
      });
      this.belongsTo(Skill, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "skill_id",
        },
        as: "skills",
      });
    }
  }
  Image.init(
    {
      image_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      org_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      program_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      event_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      skill_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      type: DataTypes.STRING,
      expiresAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "images",
      modelName: "Image",
    }
  );
  return Image;
};
