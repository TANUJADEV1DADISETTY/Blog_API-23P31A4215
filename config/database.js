const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blogdb", "root", "Tanujadevi", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;
