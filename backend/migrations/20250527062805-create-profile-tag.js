'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profile_Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "Profiles" },
          key: "profile_id",
        },
      },
     tag_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "Tags" },
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
    await queryInterface.dropTable('Profile_Tags');
  }
};