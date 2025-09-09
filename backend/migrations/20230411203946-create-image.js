"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      image_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      org_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "organizations" },
          key: "org_id",
        },
      },
      program_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "programs" },
          key: "program_id",
        },
      },
      event_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "Events" },
          key: "event_id",
        },
      },
      skill_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "skills" },
          key: "skill_id",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      url: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      expiresAt: {
        allowNull: false,
        type: DataTypes.DATE,
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
    await queryInterface.dropTable("images");
  },
};
