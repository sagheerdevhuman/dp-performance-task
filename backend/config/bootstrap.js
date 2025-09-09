'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function ensureUsers(db) {
  // Ensure specific demo users exist, even if DB already has other rows
  const now = new Date();
  const demoDefs = [
    {
      first_name: 'John', last_name: 'Doe', user_email: 'john.doe@example.com',
      passwordPlain: 'password123', flags: { is_user: true }
    },
    {
      first_name: 'Jane', last_name: 'Smith', user_email: 'jane.smith@example.com',
      passwordPlain: 'password123', flags: { is_user: true }
    },
    {
      first_name: 'Admin', last_name: 'User', user_email: 'admin@example.com',
      passwordPlain: 'admin123', flags: { is_user: false, is_meta_admin: true }
    },
  ];

  for (const def of demoDefs) {
    try {
      const hashed = await bcrypt.hash(def.passwordPlain, 10);
      let user = await db.User.findOne({ where: { user_email: def.user_email } });
      if (!user) {
        user = await db.User.create({
          first_name: def.first_name,
          last_name: def.last_name,
          user_email: def.user_email,
          password: hashed,
          is_approved: true,
          is_active: true,
          email_cofirmed: true,
          createdAt: now,
          updatedAt: now,
          ...def.flags,
        }, { validate: false });
      }

      const profile = await db.Profile.findOne({ where: { user_id: user.user_id } });
      if (!profile) {
        await db.Profile.create({
          user_id: user.user_id,
          past_experience: true,
          portfolio: `https://example.com/${user.first_name.toLowerCase()}`,
          education_level: 'Bachelor',
          college_in_stem: true,
          income_level: '50000-75000',
          date_of_birth: new Date('1990-01-01'),
          gender: 'unspecified',
          address: '123 Main St',
          zipcode: 10001,
          experience_Level: 'intermediate',
          availability: 'Mon,Wed,Fri',
          learning_style: 'visual',
          preferred_language: 'English',
          LinkedIn: 'https://linkedin.com',
          employment_status: true,
          createdAt: now,
          updatedAt: now,
        }, { validate: false });
      }
    } catch (e) {
      if (String(process.env.BOOTSTRAP_DEBUG || '').toLowerCase() === 'true') {
        console.error('ensureUsers error for', def.user_email, e?.errors || e?.message || e);
      }
    }
  }
}

async function ensureSkills(db) {
  const count = await db.Skill.count();
  if (count > 0) return;
  const now = new Date();
  const names = ['Python', 'React', 'SQL', 'DevOps'];
  await db.Skill.bulkCreate(
    names.map(name => ({ name, icon_url: '', default: '', createdAt: now, updatedAt: now })),
    { returning: false }
  );
}

async function ensureOrg(db) {
  try {
    const count = await db.Organization.count();
    if (count > 0) return;
    const now = new Date();
    await db.Organization.create({
      name: 'Demo Org',
      description: 'Sample organization for local demo',
      info_email: 'contact@demo.org',
      createdAt: now,
      updatedAt: now,
      is_active: true,
      is_approved: true,
    }, { validate: false });
  } catch (e) {
    if (String(process.env.BOOTSTRAP_DEBUG || '').toLowerCase() === 'true') {
      console.error('ensureOrg error', e?.errors || e?.message || e);
    }
  }
}

async function ensureProgramAndEvent(db) {
  try {
    const progCount = await db.Program.count();
    const evtCount = await db.Event.count();
    const org = await db.Organization.findOne();
    const now = new Date();
    if (progCount === 0 && org) {
      await db.Program.create({
        org_id: org.org_id,
        name: 'Web Dev Basics',
        description: 'Introductory program',
        requirements: 'Interest in coding',
        enrollment_deadline: new Date(Date.now() + 14*86400000),
        start_date: new Date(Date.now() + 21*86400000),
        end_date: new Date(Date.now() + 90*86400000),
        start_time: '09:00:00',
        end_time: '12:00:00',
        week_days: ['Monday', 'Wednesday'],
        location: 'Online',
        video_call_link: 'https://example.com/meet',
        is_virtual: true,
        is_featured: true,
        is_approved: true,
        is_active: true,
        createdAt: now,
        updatedAt: now,
      }, { validate: false });
    }
    if (evtCount === 0 && org) {
      await db.Event.create({
        org_id: org.org_id,
        name: 'Tech Info Session',
        description: 'Q&A and overview',
        rsvp_link: 'https://example.com/rsvp',
        location: 'Online',
        is_virtual: true,
        is_featured: true,
        is_approved: true,
        is_active: true,
        createdAt: now,
        updatedAt: now,
      }, { validate: false });
    }
  } catch (e) {
    if (String(process.env.BOOTSTRAP_DEBUG || '').toLowerCase() === 'true') {
      console.error('ensureProgramAndEvent error', e?.errors || e?.message || e);
    }
  }
}

async function bootstrap(db) {
  await ensureUsers(db);
  await ensureSkills(db);
  await ensureOrg(db);
  await ensureProgramAndEvent(db);
}

module.exports = { bootstrap };
