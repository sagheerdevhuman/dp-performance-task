'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tag_Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Events" },
          key: "event_id",
        },
      },
      tag_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName:"Tags" },
          key: "tag_id",
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
    await queryInterface.dropTable('Tag_Events');
  }
};