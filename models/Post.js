const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Author = require("./Author");

const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  author_id: { type: DataTypes.INTEGER, allowNull: false },
});

// RELATIONSHIP
Author.hasMany(Post, { foreignKey: "author_id", onDelete: "CASCADE" });
Post.belongsTo(Author, { foreignKey: "author_id" });

module.exports = Post;
