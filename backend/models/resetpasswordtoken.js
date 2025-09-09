"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResetPasswordToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: {
          type: DataTypes.UUID,
          // defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          name: "user_id",
        },
        as: "user",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  ResetPasswordToken.init(
    {
      reset_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      reset_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Invitee must have a first name!" },
          notEmpty: { msg: "First Name must not be empty!" },
        },
      },
      reset_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Invitee must have a last name!" },
          notEmpty: { msg: "Last Name must not be empty!" },
        },
      },
      reset_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Invitee must have an email!" },
          notEmpty: { msg: "Email must not be empty!" },
          isEmail: { msg: "Must be a valid email address!" },
        },
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      is_token_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "reset_password_tokens",
      modelName: "ResetPasswordToken",
    }
  );
  return ResetPasswordToken;
};
