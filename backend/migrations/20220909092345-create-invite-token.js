"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("invite_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      invite_id: {
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
      invite_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invite_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invite_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invite_token: {
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
    await queryInterface.dropTable("invite_tokens");
  },
};
