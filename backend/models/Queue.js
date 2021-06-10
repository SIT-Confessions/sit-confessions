import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QueueSchema = new Schema({
  post: {
    type: Number,
    ref: "confessions",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("queue", QueueSchema);
