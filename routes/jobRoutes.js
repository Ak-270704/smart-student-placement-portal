const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, skillsRequired, salary, companyId } = req.body;

    const job = await Job.create({
      title,
      description,
      skillsRequired,
      salary,
      companyId
    });

    res.json({
      message: "Job posted successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("companyId", "name email location");
    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;