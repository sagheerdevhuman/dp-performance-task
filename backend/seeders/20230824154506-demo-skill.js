'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const names = [
      'Python Programming',
      'Front-end Web Development',
      'Data Analysis',
      'UI/UX Design',
      'Cloud Computing',
      'Mobile App Development',
      'Machine Learning',
      'DevOps',
      'Cybersecurity',
      'Full-stack Development',
      'SQL Database Management',
      'Artificial Intelligence',
      'Network Administration',
      'Docker',
      'React.js',
      'Kubernetes',
      'Data Visualization',
      'Ruby on Rails',
      'Cloud Architecture',
      'Natural Language Processing',
      'JavaScript Development'
    ];
    const rows = names.map(name => ({
      skill_id: uuidv4(),
      name,
      icon_url: '',
      default_value: '',
      createdAt: now,
      updatedAt: now,
    }));
    await queryInterface.bulkInsert('skills', rows, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', null, {});
  }
};

