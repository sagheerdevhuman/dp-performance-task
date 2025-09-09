"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ Event_Day, Case, User, Organization, RSVP, Image,Tag,Requirements,Event_Requirements }) {
      this.belongsTo(Organization, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          defaultValue: null,
          // allowNull: true,
          name: "org_id",
        },
        as: "organization",
      });
      this.belongsToMany(User, {
        through: "RSVP",
        as: "rsvps",
        foreignKey: "event_id",
      });
      this.belongsToMany(Requirements, {
        through: "Event_Requirements",
        as: "event_requirements",
        foreignKey: "event_id",
      });
      this.hasMany(Event_Day, {
        foreignKey: "event_id",
        as: "event_days",
      });
      this.belongsToMany(Tag, {
        through: "Tag_Event",
        as: "tags",
        foreignKey: "event_id",
      });
      this.belongsToMany(Case, {
        through: "E_Case",
        as: "casses",
        foreignKey: "event_id",
      });
      this.hasOne(Image, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "event_id",
        },
        as: "images",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Event.init(
    {
      event_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      org_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      name: {
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
      banner_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      location: {
        type: DataTypes.STRING,
      },
      rsvp_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Must be a valid url!" },
          notNull: { msg: "Event must have a rsvp link!" },
          notEmpty: { msg: "RSVP link must not be empty!" },
        },
      },
      is_virtual: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_rejected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
