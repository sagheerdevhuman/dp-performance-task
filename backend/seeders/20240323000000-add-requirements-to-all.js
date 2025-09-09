'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all existing programs
    const programs = await queryInterface.sequelize.query(
      'SELECT program_id FROM programs;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Get all existing events
    const events = await queryInterface.sequelize.query(
      'SELECT event_id FROM "Events";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create basic requirements record
    const basicRequirements = {
      requirements_id: uuidv4(),
      past_experience: false,
      education_level: 'Some College (No Degree)',
      max_income_level: 100000,
      min_income: 0,
      max_age: 65,
      min_age: 18,
      gender: 'any',
      experience_Level: 'any',
      city: null,
      zipcode: null,
      radius: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create requirements for each program
    const programRequirements = [];
    for (const program of programs) {
      const requirements = {
        ...basicRequirements,
        requirements_id: uuidv4()
      };

      await queryInterface.bulkInsert('Requirements', [requirements]);

      // Create program-requirements association
      programRequirements.push({
        program_id: program.program_id,
        requirements_id: requirements.requirements_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Create requirements for each event
    const eventRequirements = [];
    for (const event of events) {
      const requirements = {
        ...basicRequirements,
        requirements_id: uuidv4()
      };

      await queryInterface.bulkInsert('Requirements', [requirements]);

      // Create event-requirements association
      eventRequirements.push({
        event_id: event.event_id,
        requirements_id: requirements.requirements_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insert program-requirements associations
    if (programRequirements.length > 0) {
      await queryInterface.bulkInsert('Program_Requirements', programRequirements);
    }

    // Insert event-requirements associations
    if (eventRequirements.length > 0) {
      await queryInterface.bulkInsert('Event_Requirements', eventRequirements);
    }
  },

  async down(queryInterface, Sequelize) {
    // Get all requirements IDs associated with programs
    const programRequirements = await queryInterface.sequelize.query(
      'SELECT requirements_id FROM "Program_Requirements";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Get all requirements IDs associated with events
    const eventRequirements = await queryInterface.sequelize.query(
      'SELECT requirements_id FROM "Event_Requirements";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Delete program-requirements associations
    await queryInterface.bulkDelete('Program_Requirements', null, {});

    // Delete event-requirements associations
    await queryInterface.bulkDelete('Event_Requirements', null, {});

    // Delete requirements records
    const allRequirementIds = [
      ...programRequirements.map(r => r.requirements_id),
      ...eventRequirements.map(r => r.requirements_id)
    ];

    if (allRequirementIds.length > 0) {
      await queryInterface.bulkDelete('Requirements', {
        requirements_id: allRequirementIds
      });
    }
  }
}; 