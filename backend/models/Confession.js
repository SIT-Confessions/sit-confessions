import mongoose from "mongoose";
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";
import { PENDING } from "../constants/status.js";

const Schema = mongoose.Schema;

const ConfessionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  fbURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: PENDING,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  approvedDate: {
    type: Date,
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rejectedDate: {
    type: Date,
  },
});

ConfessionSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: "confessions",
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model("confessions", ConfessionSchema);
