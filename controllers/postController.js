const { Post, Author } = require("../models");

// Create Post
exports.createPost = async (req, res) => {
    const { title, content, author_id } = req.body;

    const author = await Author.findByPk(author_id);
    if (!author)
        return res.status(400).json({ message: "Author does not exist" });

    const post = await Post.create({ title, content, author_id });
    res.status(201).json(post);
};

// Get all posts (optional filter)
exports.getPosts = async (req, res) => {
    const { author_id } = req.query;

    const posts = await Post.findAll({
        where: author_id ? { author_id } : {},
        include: [{ model: Author, attributes: ["name", "email"] }]
    });

    res.json(posts);
};

// Get post by ID
exports.getPostById = async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
        include: [{ model: Author, attributes: ["name", "email"] }]
    });

    if (!post)
        return res.status(404).json({ message: "Post not found" });

    res.json(post);
};

// Update post
exports.updatePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (!post)
        return res.status(404).json({ message: "Post not found" });

    await post.update(req.body);
    res.json(post);
};

// Delete post
exports.deletePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id);

    if (!post)
        return res.status(404).json({ message: "Post not found" });

    await post.destroy();
    res.json({ message: "Post deleted" });
};
