const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      succes: true,
      data: blogs,
      message: "All blog fetch sucessfully",
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
});

// GET a single blog by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOne({ id: parseInt(id) });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
