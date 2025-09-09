'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Category_Resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Categories" },
          key: "category_id",
        },
      },
      resource_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Resources" },
          key: "resource_id",
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
    await queryInterface.dropTable('Category_Resources');
  }
};