const mongoose = require("mongoose");

// Define schema for the blog data
const blogSchema = new mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  description: String,
  date: String,
  readingTime: String,
  content: [
    {
      heading: String,
      paragraphs: [String],
      points: [String],
    },
  ],
});

// Create Mongoose model based on the schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
