const { Sequelize } = require("@sequelize/core");
const { MySqlDialect } = require("@sequelize/mysql");

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "farmsmart",
  user: "root",
  password: "Emmanuel2002.",
  host: "localhost",
  port: 3306,
  logging: true,
  logging: console.log,
});

module.exports = sequelize;
