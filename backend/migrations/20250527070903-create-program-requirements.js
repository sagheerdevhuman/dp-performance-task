'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Program_Requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      program_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "programs" },
          key: "program_id",
        },
      },
      requirements_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Requirements" },
          key: "requirements_id",
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
    await queryInterface.dropTable('Program_Requirements');
  }
};