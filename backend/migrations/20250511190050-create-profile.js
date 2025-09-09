'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      profile_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        defaultValue: null,
        reference: {
          model: { tableName: "users" },
          key: "user_id",
        },
      },
      past_experience: {
        type: Sequelize.BOOLEAN
      },
      portfolio: {
        type: Sequelize.STRING
      },
      education_level: {
        type: Sequelize.STRING
      },
      college_in_stem: {
        type: Sequelize.BOOLEAN
      },
      income_level: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING,
      },
      zipcode: {
        type: Sequelize.INTEGER,
      },
      experience_Level: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.STRING
      },
      learning_style: {
        type: Sequelize.STRING
      },
      preferred_language: {
        type: Sequelize.STRING
      },
      LinkedIn: {
        type: Sequelize.STRING
      },
      employment_status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Profiles');
  }
};