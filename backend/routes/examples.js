const { Router } = require('express');
const router = Router();

// Simple fixture endpoint for SAFE_MODE
router.get('/examples', (req, res) => {
  const items = [
    { id: 1, title: 'Example Item A', status: 'ok' },
    { id: 2, title: 'Example Item B', status: 'ok' },
  ];
  res.json({ items, safeMode: String(process.env.SAFE_MODE || '').toLowerCase() === 'true' });
});

module.exports = router;

