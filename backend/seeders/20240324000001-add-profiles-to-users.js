'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get all existing users without profiles
    const users = await queryInterface.sequelize.query(
      `SELECT user_id FROM users u 
       WHERE NOT EXISTS (
         SELECT 1 FROM "Profiles" p 
         WHERE p.user_id = u.user_id
       )`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      console.log('No users found without profiles');
      return;
    }

    // Create profiles for each user
    const profiles = users.map(user => ({
      profile_id: uuidv4(),
      user_id: user.user_id,
      past_experience: false,
      portfolio: 'N/A',
      education_level: 'High School',
      college_in_stem: false,
      income_level: '0-50000',
      date_of_birth: new Date('1990-01-01'), // Default date
      gender: 'prefer not to say',
      address: 'Not provided',
      zipcode: 10000,
      experience_Level: 'beginner',
      availability: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
      learning_style: 'visual',
      preferred_language: 'English',
      LinkedIn: '',
      employment_status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert profiles
    await queryInterface.bulkInsert('Profiles', profiles);

    // Create default skills
    const defaultSkills = [
      'JavaScript',
      'Python',
      'HTML/CSS'
    ].map(name => ({
      skill_id: uuidv4(),
      name,
      icon_url: '',
      default: 'true',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert skills if they don't exist
    for (const skill of defaultSkills) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Skills" (skill_id, name, icon_url, "default", "createdAt", "updatedAt")
         SELECT :skill_id, :name, :icon_url, :default, :createdAt, :updatedAt
         WHERE NOT EXISTS (
           SELECT 1 FROM "Skills" WHERE name = :name
         )`,
        {
          replacements: skill,
          type: Sequelize.QueryTypes.INSERT
        }
      );
    }

    // Get all skills
    const existingSkills = await queryInterface.sequelize.query(
      'SELECT skill_id, name FROM "Skills"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create profile-skill associations
    const profileSkills = [];
    profiles.forEach(profile => {
      // Assign 2 random skills to each profile
      const shuffledSkills = [...existingSkills].sort(() => 0.5 - Math.random());
      for (let i = 0; i < 2; i++) {
        profileSkills.push({
          profile_id: profile.profile_id,
          skill_id: shuffledSkills[i].skill_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    // Insert profile-skill associations
    await queryInterface.bulkInsert('Profile_Skills', profileSkills);

    // Create default interests
    const defaultInterests = [
      { name: 'Web Development', type: 'Development' },
      { name: 'Data Science', type: 'Analytics' },
      { name: 'UI/UX Design', type: 'Design' }
    ].map(item => ({
      interest_id: uuidv4(),
      name: item.name,
      type: item.type,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert interests if they don't exist
    for (const interest of defaultInterests) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Interests" (interest_id, name, type, "createdAt", "updatedAt")
         SELECT :interest_id, :name, :type, :createdAt, :updatedAt
         WHERE NOT EXISTS (
           SELECT 1 FROM "Interests" WHERE name = :name
         )`,
        {
          replacements: interest,
          type: Sequelize.QueryTypes.INSERT
        }
      );
    }

    // Get all interests
    const existingInterests = await queryInterface.sequelize.query(
      'SELECT interest_id, name FROM "Interests"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create profile-interest associations
    const profileInterests = [];
    profiles.forEach(profile => {
      // Assign 2 random interests to each profile
      const shuffledInterests = [...existingInterests].sort(() => 0.5 - Math.random());
      for (let i = 0; i < 2; i++) {
        profileInterests.push({
          profile_id: profile.profile_id,
          interest_id: shuffledInterests[i].interest_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    // Insert profile-interest associations
    await queryInterface.bulkInsert('Profile_Interests', profileInterests);
  },

  async down(queryInterface, Sequelize) {
    // Get profiles created by this seeder
    const profiles = await queryInterface.sequelize.query(
      `SELECT profile_id FROM "Profiles" p 
       WHERE EXISTS (
         SELECT 1 FROM users u 
         WHERE u.user_id = p.user_id
       )`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const profileIds = profiles.map(p => p.profile_id);

    // Delete in reverse order to handle foreign key constraints
    await queryInterface.bulkDelete('Profile_Interests', {
      profile_id: profileIds
    });
    await queryInterface.bulkDelete('Profile_Skills', {
      profile_id: profileIds
    });
    await queryInterface.bulkDelete('Profiles', {
      profile_id: profileIds
    });
  }
}; 