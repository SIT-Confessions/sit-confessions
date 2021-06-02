import mongoose from "mongoose";
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";
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
  },
});

ConfessionSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: "confessions",
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model("confessions", ConfessionSchema);
