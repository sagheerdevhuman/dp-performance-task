'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get all existing programs and events
    const programs = await queryInterface.sequelize.query(
      'SELECT program_id FROM Programs WHERE is_active = true AND is_approved = true;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const events = await queryInterface.sequelize.query(
      'SELECT event_id FROM Events WHERE is_active = true AND is_approved = true;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Create a basic requirement that will be associated with all programs and events
    const basicRequirement = {
      requirements_id: uuidv4(),
      past_experience: false,
      education_level: 'High School',
      max_income_level: 100000,
      min_income: 0,
      max_age: 65,
      min_age: 18,
      gender: 'any',
      experience_Level: 'Beginner',
      city: null,
      zipcode: null,
      radius: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert the requirement
    await queryInterface.bulkInsert('Requirements', [basicRequirement], {});

    // Create program requirements associations
    const programRequirements = programs.map(program => ({
      program_id: program.program_id,
      requirements_id: basicRequirement.requirements_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Create event requirements associations
    const eventRequirements = events.map(event => ({
      event_id: event.event_id,
      requirements_id: basicRequirement.requirements_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert the associations
    if (programRequirements.length > 0) {
      await queryInterface.bulkInsert('Program_Requirements', programRequirements, {});
    }

    if (eventRequirements.length > 0) {
      await queryInterface.bulkInsert('Event_Requirements', eventRequirements, {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Get the requirements_id that was created
    const requirements = await queryInterface.sequelize.query(
      'SELECT requirements_id FROM Requirements ORDER BY "createdAt" DESC LIMIT 1;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (requirements.length > 0) {
      const requirements_id = requirements[0].requirements_id;

      // Delete all associations first
      await queryInterface.bulkDelete('Program_Requirements', { requirements_id: requirements_id }, {});
      await queryInterface.bulkDelete('Event_Requirements', { requirements_id: requirements_id }, {});

      // Then delete the requirement itself
      await queryInterface.bulkDelete('Requirements', { requirements_id: requirements_id }, {});
    }
  }
}; 