"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Organization,
      InviteToken,
      ResetPasswordToken,
      ChangePasswordToken,
      Event,
      Program,
      RSVP,
      Applicant,
      Resource,
      User_Resource,
      Profile
    }) {
      this.belongsTo(Organization, {
        foreignKey: {
          type: DataTypes.UUID,
          // defaultValue: DataTypes.UUIDV4,
          defaultValue: null,
          // allowNull: true,
          name: "org_id",
        },
        as: "organization",
      });
      // this.hasOne(InviteToken, {
      //   foreignKey: {
      //     type: DataTypes.UUID,
      //     allowNull: false,
      //     name: "user_id",
      //   },
      //   as: "invite_token",
      // });
      this.hasOne(ResetPasswordToken, {
        foreignKey: {
          type: DataTypes.UUID,
          allowNull: false,
          name: "user_id",
        },
        as: "reset_token",
      });
      this.hasOne(Profile, {
        foreignKey: {
          type: DataTypes.UUID,
          allowNull: false,
          name: "user_id",
        },
        as: "profile",
      });
      this.hasMany(RSVP)
      RSVP.belongsTo(User)
      this.belongsToMany(Event, {
        through: "RSVP",
        as: "events",
        foreignKey: "user_id",
      });
      User_Resource.belongsTo(User)
      this.belongsToMany(Resource, {
        through: "User_Resource",
        as: "resources",
        foreignKey: "user_id",
      });
      this.hasMany(Applicant)
      Applicant.belongsTo(User)
      this.belongsToMany(Program, {
        through: "Applicant",
        as: "programs",
        foreignKey: "user_id",
      });
      // this.hasOne(ChangePasswordToken, {
      //   foreignKey: {
      //     type: DataTypes.UUID,
      //     allowNull: false,
      //     name: "user_id",
      //   },
      //   as: "change_token",
      // });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      org_id: {
        type: DataTypes.UUID,
        defaultValue: null,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name!" },
          notEmpty: { msg: "First Name must not be empty!" },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a last name!" },
          notEmpty: { msg: "Last Name must not be empty!" },
        },
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          notNull: { msg: "User must have a email!" },
          notEmpty: { msg: "Email must not be empty!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          max: 32,
        },
      },
      profile_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      profile_img: {
        type: DataTypes.STRING(6000),
        allowNull: true,
        defaultValue: "",
      },
      password_reset_required: DataTypes.BOOLEAN,
      mou: DataTypes.BOOLEAN,
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_logged_in: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_meta_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_bxdp_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_org_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_org_manager: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_org_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      was_invited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email_cofirmed:{
        type: DataTypes.BOOLEAN,

        defaultValue: false,
      },
      profile_cofirmed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      settings_confirmed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      invite_token: DataTypes.STRING,
      is_token_used: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};