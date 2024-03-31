const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

// Define schema for the blog data
const blogSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  date: {
    type: String,
    default: () => {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  readingTime: String,
  content: [
    {
      heading: String,
      paragraphs: [String],
      points: [String],
    },
  ],
});

// Plugin for auto-incrementing the id field
blogSchema.plugin(autoIncrement.plugin, {
  model: "Blog",
  field: "id",
  startAt: 0,
});

// Create Mongoose model based on the schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
