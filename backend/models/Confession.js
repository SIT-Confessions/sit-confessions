import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConfessionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("confessions", ConfessionSchema);
