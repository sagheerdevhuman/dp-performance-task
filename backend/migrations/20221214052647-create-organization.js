"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("organizations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      org_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      website: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING,
      },
      zipcode: {
        type: DataTypes.INTEGER,
      },
      mou: {
        type: DataTypes.BOOLEAN,
      },
      logo_url: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      banner_url: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      digital_services: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
      },
      was_invited: {
        type: DataTypes.BOOLEAN,
      },
      invite_token: {
        type: DataTypes.STRING,
      },
      is_token_used: {
        type: DataTypes.BOOLEAN,
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
    await queryInterface.dropTable("organizations");
  },
};
