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

// POST a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE a blog by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBlog = await Blog.findOne({ id: parseInt(id) }, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a blog by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blog.findOne({ id: parseInt(id) });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      success: true,
      data: deletedBlog,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
