'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users
    const users = [
      {
        user_id: uuidv4(),
        first_name: 'John',
        last_name: 'Doe',
        user_email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        profile_url: 'https://example.com/profiles/john.jpg',
        is_approved: true,
        is_active: true,
        is_user: true,
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
        profile_url: 'https://example.com/profiles/jane.jpg',
        is_approved: true,
        is_active: true,
        is_user: true,
        email_cofirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        first_name: 'Mike',
        last_name: 'Johnson',
        user_email: 'mike.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
        profile_url: 'https://example.com/profiles/mike.jpg',
        is_approved: true,
        is_active: true,
        is_user: true,
        email_cofirmed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});

    // Make Jane a Partner (org staff) by assigning to an approved org and flipping flags
    await queryInterface.sequelize.query(`
      UPDATE users
      SET org_id = (
            SELECT org_id FROM organizations WHERE is_approved = 1 LIMIT 1
          ),
          is_org_user = 1,
          is_user = 0
      WHERE user_email = 'jane.smith@example.com'
    `);

    // Create profiles for users
    const profiles = users.map(user => ({
      profile_id: uuidv4(),
      user_id: user.user_id,
      past_experience: Math.random() > 0.5,
      portfolio: `https://portfolio.example.com/${user.first_name.toLowerCase()}`,
      education_level: ['High School', 'Bachelor', 'Master'][Math.floor(Math.random() * 3)],
      college_in_stem: Math.random() > 0.5,
      income_level: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      date_of_birth: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      gender: ['Male', 'Female', 'Non-binary'][Math.floor(Math.random() * 3)],
      address: '123 Main St',
      zipcode: 12345,
      experience_Level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
      availability: ['Full-time', 'Part-time', 'Flexible'][Math.floor(Math.random() * 3)],
      learning_style: ['Visual', 'Auditory', 'Kinesthetic'][Math.floor(Math.random() * 3)],
      preferred_language: 'English',
      LinkedIn: `https://linkedin.com/in/${user.first_name.toLowerCase()}-${user.last_name.toLowerCase()}`,
      employment_status: Math.random() > 0.5,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Profiles', profiles, {});

    // Create some sample careers
    const careers = [
      {
        career_id: uuidv4(),
        name: 'Software Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        career_id: uuidv4(),
        name: 'Data Scientist',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        career_id: uuidv4(),
        name: 'UX Designer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Careers', careers, {});

    // Create some sample roles
    const roles = [
      {
        role_id: uuidv4(),
        name: 'Frontend Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: uuidv4(),
        name: 'Backend Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: uuidv4(),
        name: 'Full Stack Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Roles', roles, {});

    // Create some sample interests
    const interests = [
      {
        interest_id: uuidv4(),
        type: 'Technology',
        name: 'Web Development',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        interest_id: uuidv4(),
        type: 'Technology',
        name: 'Mobile Development',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        interest_id: uuidv4(),
        type: 'Technology',
        name: 'Artificial Intelligence',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Interests', interests, {});

    // Create some sample tags
    const tags = [
      {
        tag_id: uuidv4(),
        name: 'JavaScript',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag_id: uuidv4(),
        name: 'Python',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag_id: uuidv4(),
        name: 'React',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag_id: uuidv4(),
        name: 'Machine Learning',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag_id: uuidv4(),
        name: 'UI/UX',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Tags', tags, {});

    // Create profile associations
    const profile_careers = [];
    const profile_roles = [];
    const profile_interests = [];
    const profile_skills = [];
    const profile_tags = [];

    // For each profile, create random associations
    profiles.forEach(profile => {
      // Add 1-2 careers for each profile
      careers.forEach(career => {
        if (Math.random() > 0.5) {
          profile_careers.push({
            profile_id: profile.profile_id,
            career_id: career.career_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      // Add 1-2 roles for each profile
      roles.forEach(role => {
        if (Math.random() > 0.5) {
          profile_roles.push({
            profile_id: profile.profile_id,
            role_id: role.role_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      // Add 1-3 interests for each profile
      interests.forEach(interest => {
        if (Math.random() > 0.3) {
          profile_interests.push({
            profile_id: profile.profile_id,
            interest_id: interest.interest_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      // Add 2-4 skills for each profile (using existing skills)
      const skillIds = Array.from({ length: 4 }, () => uuidv4());
      skillIds.forEach(skill_id => {
        if (Math.random() > 0.5) {
          profile_skills.push({
            profile_id: profile.profile_id,
            skill_id: skill_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      // Add 2-3 tags for each profile
      tags.forEach(tag => {
        if (Math.random() > 0.6) {
          profile_tags.push({
            profile_id: profile.profile_id,
            tag_id: tag.tag_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });
    });

    await queryInterface.bulkInsert('Profile_Careers', profile_careers, {});
    await queryInterface.bulkInsert('profile_roles', profile_roles, {});
    await queryInterface.bulkInsert('Profile_Interests', profile_interests, {});
    await queryInterface.bulkInsert('Profile_Skills', profile_skills, {});
    await queryInterface.bulkInsert('Profile_Tags', profile_tags, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded data in reverse order
    await queryInterface.bulkDelete('Profile_Tags', null, {});
    await queryInterface.bulkDelete('Profile_Skills', null, {});
    await queryInterface.bulkDelete('Profile_Interests', null, {});
    await queryInterface.bulkDelete('profile_roles', null, {});
    await queryInterface.bulkDelete('Profile_Careers', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Interests', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Careers', null, {});
    await queryInterface.bulkDelete('Profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
}; 
