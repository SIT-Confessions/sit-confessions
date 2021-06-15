import FB from "fb";
import Confession from "../models/Confession.js";
import Queue from "../models/Queue.js";
import mongoose from "mongoose";
import he from "he";
import { validationResult } from "express-validator";
import { APPROVED, REJECTED } from "../constants/status.js";

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
    const confessions = await Confession.find({
      status: APPROVED,
      fbURL: { $ne: null },
    }).sort({
      createdAt: -1,
    });
    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Retrieve all queued confessions.
 *
 * @returns {json} All queued confessions
 */
export const getQueuedConfessions = async (req, res) => {
  try {
    const confessions = await Queue.find().sort({ date: "asc" });
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
 * Set the status attribute to approved.
 *
 * @returns {json} Message of update results
 */
export const approveConfession = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }

    // Approve confession
    if (confession.status !== APPROVED) {
      confession.status = APPROVED;
      confession.approvedBy = req.user.id;
      confession.approvedDate = new Date().toISOString();
      confession.isQueued = true;

      await confession.save();
      await Queue.create([{ post: confession._id }], {
        session,
      });

      await session.commitTransaction();
    }
    res.status(200).json({ msg: "The confession has been approved." });
  } catch (err) {
    // Rollback changes
    console.log("Rolling back...");
    await session.abortTransaction();

    console.error(err.message);
    res.status(500).send("Server error");
  } finally {
    session.endSession();
  }
};

/**
 * Reject a confession.
 *
 * Set status attribute to rejected
 *
 * @returns {json} Message of update results
 */
export const rejectConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ msg: "Confession not found" });
    }

    // Reject confession
    if (confession.status !== REJECTED) {
      confession.status = REJECTED;
      confession.rejectedBy = req.user.id;
      confession.rejectedDate = new Date().toISOString();
      await confession.save();
    }

    res
      .status(200)
      .json({ msg: "The confession has been marked as rejected." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

/**
 * Post approved confessions to Facebook
 *
 * Retrieve a confession from the queue and
 * post it to Facebook. Confession will be removed
 * from queue once posted sucessfully
 *
 */
export const postToFB = async () => {
  // const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const queue = await Queue.findOne();
    if (!queue) return;

    const post = await Confession.findById(queue.post);
    const res = await postFB(`#${post.id}: ${he.decode(post.text)}`);

    await queue.remove();

    // Get facebook post url
    const ids = res.split("_");
    post.fbURL = `https://www.facebook.com/permalink.php?story_fbid=${ids[1]}&id=${ids[0]}`;
    post.postedToFBAt = new Date().toISOString();
    post.isQueued = false;
    post.isPostedToFB = true;
    await post.save();

    await session.commitTransaction();

    console.log(`Posted #${post.id} to facebook.`);
  } catch (err) {
    await session.abortTransaction();

    console.error(err.message);
  } finally {
    session.endSession();
  }
};

/**
 * Helper function to post a new status on Facebook page
 *
 * @param {*} msg
 * @returns {int} Facebook post id
 */
const postFB = async (msg) => {
  // Post to facebook
  FB.setAccessToken(process.env.FBACCESSTOKEN);
  const res = await FB.api(`/${process.env.FBPAGEID}/feed`, "POST", {
    message: msg,
  });
  return res.id;
};
