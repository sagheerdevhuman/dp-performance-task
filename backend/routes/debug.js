const { Router } = require('express');
const router = Router();
const models = require('../models');
const { bootstrap } = require('../config/bootstrap');

router.get('/debug/demo-users', async (req, res) => {
  try {
    const SAFE_MODE = String(process.env.SAFE_MODE || '').toLowerCase() === 'true';
    if (!SAFE_MODE) return res.status(404).json({ message: 'Not found' });
    const db = models;
    const emails = [
      'john.doe@example.com',
      'jane.smith@example.com',
      'admin@example.com',
    ];
    const results = {};
    for (const email of emails) {
      const u = await db.User.findOne({ where: { user_email: email } });
      results[email] = !!u;
    }
    const count = await db.User.count();
    res.json({ count, results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/debug/seed-demo', async (req, res) => {
  try {
    const SAFE_MODE = String(process.env.SAFE_MODE || '').toLowerCase() === 'true';
    if (!SAFE_MODE) return res.status(404).json({ message: 'Not found' });
    await models.sequelize.sync();
    process.env.BOOTSTRAP_DEBUG = process.env.BOOTSTRAP_DEBUG || 'true';
    await bootstrap(models);
    const emails = ['john.doe@example.com','jane.smith@example.com','admin@example.com'];
    const found = {};
    for (const email of emails) {
      found[email] = !!(await models.User.findOne({ where: { user_email: email } }));
    }
    const count = await models.User.count();
    res.json({ ok: true, count, found });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message, stack: String(e.stack || '') });
  }
});

router.get('/debug/users', async (req, res) => {
  try {
    const SAFE_MODE = String(process.env.SAFE_MODE || '').toLowerCase() === 'true';
    if (!SAFE_MODE) return res.status(404).json({ message: 'Not found' });
    const users = await models.User.findAll({ attributes: ['user_id','user_email','first_name','last_name'], order: [['createdAt','ASC']] });
    res.json({ count: users.length, users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
