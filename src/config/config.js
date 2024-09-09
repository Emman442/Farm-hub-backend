require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',  // Fallback to 'root' if env var not set
    password: process.env.DB_PASSWORD || 'Emmanuel2002.',  // Fallback to hardcoded password
    database: process.env.DB || 'farmsmart',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Emmanuel2002.',
    database: process.env.DB || 'farmsmart',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Emmanuel2002.',
    database: process.env.DB || 'farmsmart',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
