'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profile_roles', {
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
      role_id:{
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "Roles" },
          key: "role_id",
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
    await queryInterface.dropTable('profile_roles');
  }
};