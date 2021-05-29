import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConfessionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  approvedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("confessions", ConfessionSchema);
