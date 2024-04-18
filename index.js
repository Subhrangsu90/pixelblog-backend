require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
// const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;
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

// console.log("KEY:: ", config.JWT_SECRET);
// Enable CORS for all requests
app.use(cors());

// Middleware
app.use(bodyParser.json({ limit: "2mb" })); // Limit request body size to 2MB

app.get("/", (req, res) => {
	res.send("<h1>Hello</h1>");
});

// Routes
app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);
// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
