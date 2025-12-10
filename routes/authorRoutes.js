const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorController");

// Author Routes
router.post("/", controller.createAuthor);
router.get("/", controller.getAuthors);
router.get("/:id", controller.getAuthorById);
router.put("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);

// Nested route: get posts for author
router.get("/:id/posts", controller.getAuthorPosts);

module.exports = router;
