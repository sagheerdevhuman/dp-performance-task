require('dotenv').config();
const app = require("./app");
const models = require("./models");
const { sequelize } = models;

const PORT = process.env.PORT || 5001;
const SAFE_MODE = String(process.env.SAFE_MODE || '').toLowerCase() === 'true';
const { bootstrap } = require('./config/bootstrap');

async function start() {
  if (SAFE_MODE || (process.env.DB_DIALECT || '').toLowerCase() === 'sqlite') {
    try {
      await sequelize.authenticate();
      console.log('DB (sqlite or safe) is usable.');
      // In safe/sqlite mode, ensure tables match models even if migrations didn't run
      await sequelize.sync({ alter: true });
      // Ensure demo data exists BEFORE accepting requests
      process.env.BOOTSTRAP_DEBUG = process.env.BOOTSTRAP_DEBUG || 'true';
      await bootstrap(models);
    } catch (e) {
      console.error('DB bootstrap/sync in SAFE_MODE failed:', e);
    }
  } else {
    try {
      await sequelize.authenticate();
      console.log(`Database is connected!`);
    } catch (e) {
      console.error('Database connection failed:', e.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

start();
