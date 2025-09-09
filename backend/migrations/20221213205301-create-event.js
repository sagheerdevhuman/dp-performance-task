"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      org_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "organizations" },
          key: "org_id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      banner_url: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      location: {
        type: Sequelize.STRING,
      },
      rsvp_link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_virtual: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
