"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User,Case, Skill, Topic, Organization, Applicant, Image,Requirements,Program_Requirements }) {
      this.belongsTo(Organization, {
        foreignKey: {
          type: DataTypes.UUID,
          defaultValue: null,
          name: "org_id",
        },
        as: "organization",
      });
      this.belongsToMany(User, {
        through: "Applicant",
        as: "applicants",
        foreignKey: "program_id",
      });
      this.belongsToMany(Requirements, {
        through: "Program_Requirements",
        as: "program_requirements",
        foreignKey: "program_id",
      });
      this.belongsToMany(Skill, {
        through: "Topic",
        as: "skills",
        foreignKey: "program_id",
      });
      this.belongsToMany(Case, {
        through: "P_Case",
        as: "casses",
        foreignKey: "program_id",
      });
      this.hasOne(Image, {
        foreignKey: {
          type: DataTypes.UUID,
          name: "program_id",
        },
        as: "images",
      });
    }
  }
  Program.init(
    {
      program_id: {
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
          notNull: { msg: "Program must have a name!" },
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
      requirements: {
        type: DataTypes.STRING(3000),
      },
      enrollment_deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Program must have a deadline!" },
          notEmpty: { msg: "Deadline must not be empty!" },
        },
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Program must have a start date!" },
          notEmpty: { msg: "Start date number must not be empty!" },
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Program must have a end date!" },
          notEmpty: { msg: "End date number must not be empty!" },
        },
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: { msg: "Program must have a start time!" },
          notEmpty: { msg: "Start time must not be empty!" },
        },
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notNull: { msg: "Program must have a end time!" },
          notEmpty: { msg: "End time must not be empty!" },
        },
      },
      week_days: (function() {
        const isSqlite = (sequelize.getDialect && sequelize.getDialect() === 'sqlite');
        if (isSqlite) {
          return {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
              const raw = this.getDataValue('week_days');
              try { return raw ? JSON.parse(raw) : []; } catch { return []; }
            },
            set(v) {
              const arr = Array.isArray(v) ? v : (typeof v === 'string' ? [v] : []);
              this.setDataValue('week_days', JSON.stringify(arr));
            },
            validate: {
              notNull: { msg: "Program must have am Week Days!" },
            },
          };
        }
        return {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
          validate: {
            notNull: { msg: "Program must have am Week Days!" },
            notEmpty: { msg: "Location must not be empty!" },
          },
        };
      })(),
      location: {
        type: DataTypes.STRING,
      },
      video_call_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Must be a valid url!" },
          notNull: { msg: "Program must have a video link!" },
          notEmpty: { msg: "Call Link must not be empty!" },
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
      tableName: "programs",
      modelName: "Program",
    }
  );
  return Program;
};
