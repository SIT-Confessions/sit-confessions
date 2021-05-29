import auth from "../../middleware/auth.js";
import express from "express";
import { check, validationResult } from "express-validator";

import Confession from "../../models/Confession.js";

const router = express.Router();

// @route   POST api/confessions
// @desc    Create a confession
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newConfession = new Confession({
        text: req.body.text,
      });

      const confession = await newConfession.save();
      res.json(confession);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/confessions
// @desc    Get all confessions
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ date: -1 });
    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/confessions/approved
// @desc    Get all confessions
// @access  Private
router.get("/approved", auth, async (req, res) => {
  try {
    const confessions = await Confession.find({ approved: true }).sort({
      date: -1,
    });
    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/confessions/:id
// @desc    Get confession by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }
    res.json(confession);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "confession not found" });
    }

    res.status(500).send("Server error");
  }
});

// @route   PUT api/confessions/approve/:id
// @desc    Approve confession by id
// @access  Private
router.put("/approve/:id", auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }

    // Approve confession
    if (!confession.approved) {
      confession.approved = true;
      confession.approvedBy = req.user.id;
      confession.approvedDate = new Date().toISOString();
      await confession.save();
    }

    res.status(200).json({ msg: "Confession approved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/confessions/reject/:id
// @desc    Reject confession by id
// @access  Private
router.put("/reject/:id", auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }

    // Approve confession
    if (confession.approved) {
      confession.approved = false;
      await confession.save();
    }

    res.status(200).json({ msg: "Confession rejected" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
