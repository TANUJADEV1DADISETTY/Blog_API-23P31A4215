const sequelize = require("../config/database");
const Author = require("./Author");
const Post = require("./Post");

// Sync tables
sequelize.sync({ alter: true });

module.exports = { sequelize, Author, Post };
