import { validationResult } from "express-validator";

import Confession from "../models/Confession.js";

/**
 * Create a new confession post into db.
 *
 * @returns {json} New post details
 */
export const createConfession = async (req, res) => {
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
};

/**
 * Retrieve all confessions from db.
 *
 * @returns {json} All confessions
 */
export const getAllConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Retrieve all approved confessions.
 *
 * @returns {json} All approved confessions
 */
export const getApprovedConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find({ approved: true }).sort({
      createdAt: -1,
    });
    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Retrieve a confession based on id from db.
 *
 * @returns {json} Confession post details
 */
export const getConfession = async (req, res) => {
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
};

/**
 * Approve a confession post.
 *
 * Set the approved attribute to true.
 *
 * @returns {json} Message of update results
 */
export const approveConfession = async (req, res) => {
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
};

/**
 * Reject a confession.
 *
 * Set approved attribute to false
 *
 * @returns {json} Message of update results
 */
export const rejectConfession = async (req, res) => {
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
};
