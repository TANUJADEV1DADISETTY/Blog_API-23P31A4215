const { Author, Post } = require("../models");

// CREATE POST
exports.createPost = async (req, res) => {
  const { author_id } = req.body;

  const author = await Author.findByPk(author_id);
  if (!author) return res.status(400).json({ error: "Author does not exist" });

  const post = await Post.create(req.body);
  res.status(201).json(post);
};

// GET ALL POSTS (with filtering + JOIN)
exports.getPosts = async (req, res) => {
  const filter = req.query.author_id
    ? { where: { author_id: req.query.author_id }, include: Author }
    : { include: Author };

  const posts = await Post.findAll(filter);
  res.json(posts);
};

// GET ONE POST (with author)
exports.getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: Author,
  });

  if (!post) return res.status(404).json({ error: "Post not found" });

  res.json(post);
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  await post.update(req.body);
  res.json(post);
};

// DELETE POST
exports.deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  await post.destroy();
  res.json({ message: "Post deleted" });
};

// NESTED ROUTE: GET POSTS OF AUTHOR
exports.getAuthorPosts = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  const posts = await Post.findAll({ where: { author_id: req.params.id } });
  res.json(posts);
};
