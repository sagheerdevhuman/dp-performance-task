'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users with different roles
    const users = [
      {
        user_id: uuidv4(),
        first_name: 'John',
        last_name: 'Doe',
        user_email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        profile_url: '',
        password_reset_required: false,
        mou: true,
        is_approved: true,
        is_active: true,
        is_logged_in: false,
        is_meta_admin: false,
        is_bxdp_admin: false,
        is_org_admin: false,
        is_org_manager: false,
        is_org_user: false,
        is_user: true,
        was_invited: false,
        email_cofirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        first_name: 'Jane',
        last_name: 'Smith',
        user_email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        profile_url: '',
        password_reset_required: false,
        mou: true,
        is_approved: true,
        is_active: true,
        is_logged_in: false,
        is_meta_admin: false,
        is_bxdp_admin: false,
        is_org_admin: false,
        is_org_manager: false,
        is_org_user: false,
        is_user: true,
        was_invited: false,
        email_cofirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        first_name: 'Admin',
        last_name: 'User',
        user_email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        profile_url: '',
        password_reset_required: false,
        mou: true,
        is_approved: true,
        is_active: true,
        is_logged_in: false,
        is_meta_admin: true,
        is_bxdp_admin: false,
        is_org_admin: false,
        is_org_manager: false,
        is_org_user: false,
        is_user: false,
        was_invited: false,
        email_cofirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert users
    await queryInterface.bulkInsert('users', users);

    // Create profiles for each user
    const profiles = [
      {
        profile_id: uuidv4(),
        user_id: users[0].user_id,
        past_experience: true,
        portfolio: 'https://johndoe.dev',
        education_level: 'Bachelor',
        college_in_stem: true,
        income_level: '50000-75000',
        date_of_birth: new Date('1995-05-15'),
        gender: 'male',
        address: 'San Francisco, CA',
        zipcode: 94105,
        experience_Level: 'intermediate',
        availability: JSON.stringify(['Monday', 'Wednesday', 'Friday']),
        learning_style: 'visual',
        preferred_language: 'English',
        LinkedIn: 'https://linkedin.com/in/johndoe',
        employment_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile_id: uuidv4(),
        user_id: users[1].user_id,
        past_experience: true,
        portfolio: 'https://janesmith.dev',
        education_level: 'Master',
        college_in_stem: true,
        income_level: '75000-100000',
        date_of_birth: new Date('1998-08-23'),
        gender: 'female',
        address: 'New York, NY',
        zipcode: 10001,
        experience_Level: 'advanced',
        availability: JSON.stringify(['Tuesday', 'Thursday', 'Saturday']),
        learning_style: 'kinesthetic',
        preferred_language: 'English',
        LinkedIn: 'https://linkedin.com/in/janesmith',
        employment_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile_id: uuidv4(),
        user_id: users[2].user_id,
        past_experience: true,
        portfolio: 'https://adminuser.dev',
        education_level: 'PhD',
        college_in_stem: true,
        income_level: '100000-150000',
        date_of_birth: new Date('1985-12-10'),
        gender: 'other',
        address: 'Austin, TX',
        zipcode: 78701,
        experience_Level: 'expert',
        availability: JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
        learning_style: 'auditory',
        preferred_language: 'English',
        LinkedIn: 'https://linkedin.com/in/adminuser',
        employment_status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert profiles
    await queryInterface.bulkInsert('profiles', profiles);

    // Create skills
    const skills = [
      'JavaScript',
      'Python',
      'React',
      'Node.js',
      'SQL',
      'Machine Learning',
      'Data Analysis',
      'System Design',
      'Cloud Computing',
      'DevOps'
    ].map(name => ({
      skill_id: uuidv4(),
      name,
      icon_url: '',
      default: 'false',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert skills
    await queryInterface.bulkInsert('skills', skills);

    // Create profile-skill associations
    const profileSkills = [];
    profiles.forEach(profile => {
      // Randomly assign 3-5 skills to each profile
      const numSkills = Math.floor(Math.random() * 3) + 3;
      const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numSkills; i++) {
        profileSkills.push({
          profile_id: profile.profile_id,
          skill_id: shuffledSkills[i].skill_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    // Insert profile-skill associations
    await queryInterface.bulkInsert('profile_skills', profileSkills);

    // Create interests with types
    const interestData = [
      { name: 'Web Development', type: 'Development' },
      { name: 'Mobile Development', type: 'Development' },
      { name: 'Data Science', type: 'Analytics' },
      { name: 'Artificial Intelligence', type: 'Technology' },
      { name: 'Blockchain', type: 'Technology' },
      { name: 'Cybersecurity', type: 'Security' },
      { name: 'Cloud Architecture', type: 'Infrastructure' },
      { name: 'UI/UX Design', type: 'Design' },
      { name: 'Product Management', type: 'Management' },
      { name: 'Technical Writing', type: 'Communication' }
    ].map(item => ({
      interest_id: uuidv4(),
      name: item.name,
      type: item.type,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert interests
    await queryInterface.bulkInsert('interests', interestData);

    // Create profile-interest associations
    const profileInterests = [];
    profiles.forEach(profile => {
      // Randomly assign 2-4 interests to each profile
      const numInterests = Math.floor(Math.random() * 3) + 2;
      const shuffledInterests = [...interestData].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numInterests; i++) {
        profileInterests.push({
          profile_id: profile.profile_id,
          interest_id: shuffledInterests[i].interest_id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    // Insert profile-interest associations
    await queryInterface.bulkInsert('profile_interests', profileInterests);
  },

  async down(queryInterface, Sequelize) {
    // Delete in reverse order to handle foreign key constraints
    await queryInterface.bulkDelete('profile_interests', null, {});
    await queryInterface.bulkDelete('profile_skills', null, {});
    await queryInterface.bulkDelete('interests', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
}; 