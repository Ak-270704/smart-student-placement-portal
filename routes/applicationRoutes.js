const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      studentId,
      jobId
    });

    if (alreadyApplied) {
      return res.json({
        message: "You have already applied for this job"
      });
    }

    const application = await Application.create({
      studentId,
      jobId
    });

    res.json({
      message: "Applied successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.get("/student/:studentId", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.params.studentId
    }).populate({
      path: "jobId",
      populate: {
        path: "companyId",
        select: "name email location"
      }
    });

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;