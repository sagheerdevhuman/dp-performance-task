"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("change_password_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      change_id: {
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
      change_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      change_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      change_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      change_token: {
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
    await queryInterface.dropTable("change_password_tokens");
  },
};
