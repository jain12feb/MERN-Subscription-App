const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/checkAuth");
const { createArticle, allArticles } = require("../controllers/articles");

router
  .route("/articles")
  .post(checkAuth, createArticle)
  .get(checkAuth, allArticles);

module.exports = router;
