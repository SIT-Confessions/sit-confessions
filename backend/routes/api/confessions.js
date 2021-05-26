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

// @route   GET api/confessions/:id
// @desc    Get confession by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }
    return res.json(confession);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "confession not found" });
    }

    return res.status(500).send("Server error");
  }
});

export default router;
