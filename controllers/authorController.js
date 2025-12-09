const { Author, Post } = require("../models");

// CREATE AUTHOR
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL AUTHORS
exports.getAuthors = async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
};

// GET ONE AUTHOR
exports.getAuthorById = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });
  res.json(author);
};

// UPDATE AUTHOR
exports.updateAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  await author.update(req.body);
  res.json(author);
};

// DELETE AUTHOR (CASCADE POSTS)
exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  await author.destroy(); // cascade deletes posts
  res.json({ message: "Author and related posts deleted" });
};
