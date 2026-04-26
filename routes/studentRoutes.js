const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course, skills } = req.body;

    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      return res.json({
        message: "Student already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      course,
      skills
    });

    res.json({
      message: "Student registered successfully",
      student
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      student
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;