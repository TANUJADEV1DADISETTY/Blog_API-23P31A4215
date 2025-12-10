const sequelize = require("../config/database");
const Author = require("./Author");
const Post = require("./Post");

// Ensure relationships get registered
const initializeDatabase = async () => {
    await sequelize.sync({ alter: true }); 
    console.log("Database synced successfully.");
};

module.exports = { initializeDatabase, Author, Post };
