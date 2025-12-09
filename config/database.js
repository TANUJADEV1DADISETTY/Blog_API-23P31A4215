const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "blogdb",     // database name
  "root",       // username
  "password",   // password
  {
    host: "localhost",
    dialect: "mysql", // or 'postgres'
  }
);

module.exports = sequelize;
