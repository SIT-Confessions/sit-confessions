import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.Schema("categories", CategorySchema);
