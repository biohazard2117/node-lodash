const _ = require("lodash");
const error_generator = require("../error/errorGenerator");


const memoizedSearch = _.memoize((searchQuery, blogs) => {
  // console.log(`Executing memoizedSearch for query: ${searchQuery}`);
  return _.filter(blogs, (blog) =>
    _.includes(_.toLower(blog.title), _.toLower(searchQuery))
  );
});

const memoizedPrivacyFilter = _.memoize((blogs) =>
  _.filter(blogs, (blog) => _.includes(_.toLower(blog.title), "privacy"))
);

const memoizedUniqueTitles = _.memoize((blogs) =>
  _.uniqBy(blogs, "title").map((blog) => blog.title)
);


const get_all_blogs = async (req, res) => {
  const blogs = req.data.blogs;

  // Task 1: Calculate the total number of blogs fetched
  const totalBlogs = _.size(blogs);

  // Task 2: Find the blog with the longest title
  const longestTitleBlog = _.maxBy(blogs, (blog) => blog.title.length);

  // Task 3: Determine the number of blogs with titles containing the word "privacy"
  const privacyBlogs = memoizedPrivacyFilter(blogs);
  const numPrivacyBlogs = privacyBlogs.length;

  // Task 4: Create an array of unique blog titles (no duplicates)
  const uniqueTitles = memoizedUniqueTitles(blogs);

  res.json({
    totalBlogs,
    longestTitleBlog,
    numPrivacyBlogs,
    uniqueTitles,
  });
};


const get_blog = async (req, res) => {
  const searchQuery = req.query.query;
  const blogs = req.data.blogs;
  const data = memoizedSearch(searchQuery, blogs);
  // console.log(`Returned data for query: ${searchQuery}`);
  res.json(data);
};

// clearing cache after 5 minutes
setTimeout(() => {
  memoizedSearch.cache.clear();
  memoizedPrivacyFilter.cache.clear();
  console.log("Cache cleared");
}, 5 * 60 * 1000); 

module.exports = {
  get_all_blogs,
  get_blog,
};
