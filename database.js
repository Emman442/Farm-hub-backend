const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");
require('dotenv').config({ path: './src/.env' });


console.log(process.env.DB_PORT)
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  logging: true,
  logging: console.log,
});

module.exports = sequelize;
