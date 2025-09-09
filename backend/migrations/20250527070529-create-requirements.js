'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      requirements_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      past_experience: {
        type: Sequelize.BOOLEAN
      },
      education_level: {
        type: Sequelize.STRING
      },
      max_income_level: {
        type: Sequelize.INTEGER
      },
      min_income: {
        type: Sequelize.INTEGER
      },
      max_age: {
        type: Sequelize.INTEGER
      },
      min_age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      experience_Level: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.INTEGER
      },
      radius: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Requirements');
  }
};