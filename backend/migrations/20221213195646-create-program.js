"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("programs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      program_id: {
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
      requirements: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      enrollment_deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      week_days: (function() {
        // SQLite does not support ARRAY; store JSON string instead
        const dialect = (queryInterface.sequelize && queryInterface.sequelize.getDialect && queryInterface.sequelize.getDialect()) || '';
        if (String(dialect).toLowerCase() === 'sqlite') {
          return { type: Sequelize.TEXT, allowNull: false };
        }
        return { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false };
      })(),
      location: {
        type: Sequelize.STRING,
      },
      video_call_link: {
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
    await queryInterface.dropTable("programs");
  },
};
