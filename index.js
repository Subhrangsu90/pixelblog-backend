require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Enable CORS for all requests
app.use(cors());

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// Routes
app.use("/api/blogs", blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
