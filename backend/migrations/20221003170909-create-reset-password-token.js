"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("reset_password_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      reset_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        reference: {
          model: { tableName: "users" },
          key: "user_id",
        },
        allowNull: false,
      },
      reset_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reset_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reset_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      is_token_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("reset_password_tokens");
  },
};
