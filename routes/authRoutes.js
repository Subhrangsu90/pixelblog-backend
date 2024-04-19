// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registration endpoint
router.post("/register", async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body;

		// Check if passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		// Check if user with the same email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role: "user",
		});
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Login endpoint
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Compare passwords
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Check user role
		if (user.role !== "admin" && user.role !== "user") {
			return res.status(403).json({ message: "Invalid role" });
		}

		// Generate token
		const token = jwt.sign(
			{ userId: user._id, email: user.email, role: user.role, name: user.name },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
