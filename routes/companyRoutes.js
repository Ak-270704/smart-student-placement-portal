const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({
        message: "Company already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      location
    });

    res.json({
      message: "Company registered successfully",
      company
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

    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: company._id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      company
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;