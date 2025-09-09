'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('O_Cases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      org_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "organizations" },
          key: "org_id",
        },
      },
      case_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Cases" },
          key: "case_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('O_Cases');
  }
};