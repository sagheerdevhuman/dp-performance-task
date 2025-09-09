'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create sample organizations first
    const organizations = await queryInterface.bulkInsert('organizations', [
      {
        name: 'Tech Futures Academy',
        description: 'Empowering youth through technology education',
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
        is_approved: true
      },
      {
        name: 'Career Launch Institute',
        description: 'Bridging the gap between education and employment',
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
        is_approved: true
      },
      {
        name: 'Digital Skills Foundation',
        description: 'Building digital literacy for the future workforce',
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
        is_approved: true
      }
    ], { returning: true });

    // Create requirements sets
    const requirements = await queryInterface.bulkInsert('requirements', [
      {
        // Basic entry-level requirements
        education_level: 'High School',
        max_income_level: 45000,
        min_age: 16,
        max_age: 24,
        gender: 'any',
        experience_Level: 'Beginner',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // Mid-level requirements
        education_level: 'Bachelor',
        max_income_level: 65000,
        min_age: 18,
        max_age: 35,
        gender: 'any',
        experience_Level: 'Intermediate',
        past_experience: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // No specific requirements
        education_level: 'any',
        gender: 'any',
        experience_Level: 'any',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Create programs
    const programs = await queryInterface.bulkInsert('programs', [
      {
        name: 'Web Development Bootcamp',
        description: 'Intensive 12-week program covering full-stack web development',
        org_id: organizations[0].org_id,
        enrollment_deadline: ynew Date(new Date().setDate(new Date().getDate() + 30)),
        start_date: new Date(new Date().setDate(new Date().getDate() + 45)),
        end_date: new Date(new Date().setDate(new Date().getDate() + 129)),
        start_time: '09:00:00',
        end_time: '17:00:00',
        week_days: ['Monday', 'Wednesday', 'Friday'],
        location: 'Online & In-person',
        is_virtual: true,
        is_active: true,
        is_approved: true,
        is_featured: true,
        banner_url: 'https://example.com/web-dev-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Digital Marketing Certificate',
        description: 'Learn digital marketing fundamentals and strategy',
        org_id: organizations[1].org_id,
        enrollment_deadline: new Date(new Date().setDate(new Date().getDate() + 15)),
        start_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        end_date: new Date(new Date().setDate(new Date().getDate() + 90)),
        start_time: '18:00:00',
        end_time: '21:00:00',
        week_days: ['Tuesday', 'Thursday'],
        location: 'Online',
        is_virtual: true,
        is_active: true,
        is_approved: true,
        is_featured: false,
        banner_url: 'https://example.com/digital-marketing-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Data Analytics Fundamentals',
        description: 'Introduction to data analysis and visualization',
        org_id: organizations[2].org_id,
        enrollment_deadline: new Date(new Date().setDate(new Date().getDate() + 45)),
        start_date: new Date(new Date().setDate(new Date().getDate() + 60)),
        end_date: new Date(new Date().setDate(new Date().getDate() + 150)),
        start_time: '10:00:00',
        end_time: '15:00:00',
        week_days: ['Monday', 'Wednesday'],
        location: 'In-person',
        is_virtual: false,
        is_active: true,
        is_approved: true,
        is_featured: true,
        banner_url: 'https://example.com/data-analytics-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Create events
    const events = await queryInterface.bulkInsert('events', [
      {
        name: 'Tech Career Fair 2024',
        description: 'Connect with top tech companies and explore career opportunities',
        org_id: organizations[0].org_id,
        location: 'Convention Center',
        is_virtual: false,
        is_active: true,
        is_approved: true,
        is_featured: true,
        banner_url: 'https://example.com/career-fair-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Digital Skills Workshop Series',
        description: 'Weekly workshops covering essential digital skills',
        org_id: organizations[2].org_id,
        location: 'Online',
        is_virtual: true,
        is_active: true,
        is_approved: true,
        is_featured: true,
        banner_url: 'https://example.com/workshop-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Entrepreneurship Summit',
        description: 'Learn from successful entrepreneurs and network',
        org_id: organizations[1].org_id,
        location: 'Innovation Hub',
        is_virtual: false,
        is_active: true,
        is_approved: true,
        is_featured: false,
        banner_url: 'https://example.com/summit-banner.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Create event days
    await queryInterface.bulkInsert('event_days', [
      {
        event_id: events[0].event_id,
        date: new Date(new Date().setDate(new Date().getDate() + 30)),
        start_time: '10:00:00',
        end_time: '18:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[1].event_id,
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        start_time: '14:00:00',
        end_time: '16:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[1].event_id,
        date: new Date(new Date().setDate(new Date().getDate() + 14)),
        start_time: '14:00:00',
        end_time: '16:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[2].event_id,
        date: new Date(new Date().setDate(new Date().getDate() + 45)),
        start_time: '09:00:00',
        end_time: '17:00:00',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Associate requirements with programs
    await queryInterface.bulkInsert('program_requirements', [
      {
        program_id: programs[0].program_id,
        requirements_id: requirements[0].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        program_id: programs[1].program_id,
        requirements_id: requirements[2].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        program_id: programs[2].program_id,
        requirements_id: requirements[1].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Associate requirements with events
    await queryInterface.bulkInsert('event_requirements', [
      {
        event_id: events[0].event_id,
        requirements_id: requirements[2].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[1].event_id,
        requirements_id: requirements[0].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[2].event_id,
        requirements_id: requirements[1].requirements_id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Create skills
    const skills = await queryInterface.bulkInsert('skills', [
      {
        name: 'JavaScript',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Digital Marketing',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Data Analysis',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Python',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Associate skills with programs
    await queryInterface.bulkInsert('topics', [
      {
        program_id: programs[0].program_id,
        skill_id: skills[0].skill_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        program_id: programs[1].program_id,
        skill_id: skills[1].skill_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        program_id: programs[2].program_id,
        skill_id: skills[2].skill_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        program_id: programs[2].program_id,
        skill_id: skills[3].skill_id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Create tags
    const tags = await queryInterface.bulkInsert('tags', [
      {
        name: 'Career Development',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Technology',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Networking',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Associate tags with events
    await queryInterface.bulkInsert('event_tags', [
      {
        event_id: events[0].event_id,
        tag_id: tags[0].tag_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[0].event_id,
        tag_id: tags[1].tag_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[1].event_id,
        tag_id: tags[1].tag_id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        event_id: events[2].event_id,
        tag_id: tags[2].tag_id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove data in reverse order to handle foreign key constraints
    await queryInterface.bulkDelete('event_tags', null, {});
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('topics', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('event_requirements', null, {});
    await queryInterface.bulkDelete('program_requirements', null, {});
    await queryInterface.bulkDelete('event_days', null, {});
    await queryInterface.bulkDelete('events', null, {});
    await queryInterface.bulkDelete('programs', null, {});
    await queryInterface.bulkDelete('requirements', null, {});
    await queryInterface.bulkDelete('organizations', null, {});
  }
}; 