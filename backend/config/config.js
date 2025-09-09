require("dotenv").config();

const base = () => {
  const dialect = process.env.DB_DIALECT || 'sqlite';
  if (dialect === 'sqlite') {
    return {
      dialect: 'sqlite',
      storage: process.env.SQLITE_STORAGE || './dev.sqlite',
      logging: false,
      timeout: 60000,
    };
  }
  return {
    username: process.env.DB_USER || 'bxdp',
    password: process.env.DB_PASSWORD || 'changeme',
    database: process.env.DB_NAME || 'dbbxdp',
    host: process.env.DB_HOST || 'localhost',
    dialect,
    logging: false,
    timeout: 60000,
  };
};

module.exports = {
  development: base(),
  test: base(),
  production: base(),
};
