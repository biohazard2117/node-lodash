const express = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;

// api routes
app.use("/api", blogRoutes);

// error handling function
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(400).send(err.message);
});

app.use("/api/test", (req, res) => {
  res.json({ message: "hi" }).status(200);
});

const server = app.listen(
  PORT,
  console.log(`Server running on PORT : http://localhost:${PORT}`)
);

module.exports = app;
