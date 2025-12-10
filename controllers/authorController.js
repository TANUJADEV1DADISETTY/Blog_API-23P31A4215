const { Author, Post } = require("../models");

// Create Author
exports.createAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;
        const author = await Author.create({ name, email });
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all authors
exports.getAuthors = async (req, res) => {
    const authors = await Author.findAll();
    res.json(authors);
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (!author)
        return res.status(404).json({ message: "Author not found" });

    res.json(author);
};

// Update author
exports.updateAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (!author)
        return res.status(404).json({ message: "Author not found" });

    await author.update(req.body);
    res.json(author);
};

// Delete author (Cascade deletes posts)
exports.deleteAuthor = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    if (!author)
        return res.status(404).json({ message: "Author not found" });

    await author.destroy();
    res.json({ message: "Author and related posts deleted" });
};

// Get all posts by author
exports.getAuthorPosts = async (req, res) => {
    const author = await Author.findByPk(req.params.id);

    if (!author)
        return res.status(404).json({ message: "Author not found" });

    const posts = await Post.findAll({ where: { author_id: req.params.id } });

    res.json(posts);
};
