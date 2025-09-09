'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profile_Careers', {
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
      career_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "Careers" },
          key: "career_id",
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
    await queryInterface.dropTable('Profile_Careers');
  }
};