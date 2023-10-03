const express = require("express");
// const userControllers = require("../controllers/userControllers");
const blogControllers = require("../controllers/blogControllers");
const { api_request } = require("../middleware/blogData");
const router = express.Router();

// middleware to handle the errors
const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router
  .route("/blog-stats")
  .get(api_request, use(blogControllers.get_all_blogs));

router
  .route("/blog-search")
  .get(api_request, use(blogControllers.get_blog));

module.exports = router;
