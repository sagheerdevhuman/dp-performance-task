"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Resource, Case, Program, Event, Image,Video }) {
      this.hasMany(User, {
        foreignKey: {
          type: DataTypes.UUID,
          // defaultValue: DataTypes.UUIDV4,
          // allowNull: false,
          name: "org_id",
        },
        as: "user",
      });
      this.hasMany(Video, {
        foreignKey: {
          type: DataTypes.UUID,
          // defaultValue: DataTypes.UUIDV4,
          // allowNull: false,
          name: "org_id",
        },
        as: "videos",
      });
      this.hasMany(Program, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "org_id",
        },
        as: "programs",
      });
      this.hasMany(Event, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "org_id",
        },
        as: "events",
      });
      this.belongsToMany(Case, {
        through: "O_Case",
        as: "casses",
        foreignKey: "org_id",
      });
      this.belongsToMany(Resource, {
        through: "Org_Resource",
        as: "resources",
        foreignKey: "org_id",
      });
      this.hasOne(Image, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "org_id",
        },
        as: "images",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Organization.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      org_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Organization must have a name!" },
          notEmpty: { msg: "Name must not be empty!" },
        },
      },
      description: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          isNumeric: true,
          min: 5,
        },
      },
      info_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Organization must have an info email!" },
          notEmpty: { msg: "Info Email must not be empty!" },
        },
      },

      mou: DataTypes.BOOLEAN,

      logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },

      banner_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },

      digital_services: {
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
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },


      was_invited: DataTypes.BOOLEAN,
      invite_token: DataTypes.STRING,
      is_token_used: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "organizations",
      modelName: "Organization",
    }
  );
  return Organization;
};
